import { FormEvent, useCallback, useEffect, useState } from 'react';

import { App, odeServices } from '@edifice.io/ts-client';
import { Applications } from '../../../../icons/dist';
/*
 * Augmented definition of a resource, until behaviours are dropped.
 * The path would otherwise be found by using `IWebResourceService.getViewUrl(resource)`
 */
import { ILinkedResource } from '@edifice.io/ts-client';
import { useTranslation } from 'react-i18next';

import { AppIcon, Dropdown, EmptyScreen } from '../../components';
import { SearchBar } from '../../components/SearchBar';
import { useOdeTheme, usePaths, useResourceSearch } from '../../core';
import { useDebounce } from '../../hooks';
import LinkerCard from '../LinkerCard/LinkerCard';

/**
 * Definition of an internal link.
 */
type ApplicationOption = {
  icon?: JSX.Element;
  application: string;
  displayName: string;
};

/**
 * Properties for the InternalLinker react component.
 */
export interface InternalLinkerProps {
  /** Currently running application */
  appCode: App;
  /** When defined, preloads and displays this type of resources. */
  defaultAppCode?: App | null;
  /** When defined, selects this resource (defaultApp must be specified) */
  defaultResourceId?: string | null;
  /** Notify when the user selects an application in the dropdown */
  onChange?: (application?: ApplicationOption) => void;
  /** Notify when resources selection changes */
  onSelect?: (resources: ILinkedResource[]) => void;
  multiple: boolean | undefined;
}

/** The InternalLinker component */
const InternalLinker = ({
  appCode,
  defaultAppCode,
  defaultResourceId,
  onChange,
  onSelect,
  multiple = true,
}: InternalLinkerProps) => {
  const { t } = useTranslation();
  const { theme } = useOdeTheme();
  const [imagePath] = usePaths();

  // Get available applications, and a function to load their resources.
  const { resourceApplications, loadResources } = useResourceSearch(appCode);

  // List of options (applications with name and icon) to display, for the user to choose.
  const [options, setOptions] = useState<Array<ApplicationOption>>();
  // User selected application
  const [selectedApplication, setSelectedApplication] = useState<
    ApplicationOption | undefined
  >();
  // User search terms (typed in an input) and its debounced equivalent.
  const [searchTerms, setSearchTerms] = useState<string | undefined>();
  const debounceSearch = useDebounce<string>(searchTerms || '', 500);

  // List of resources to display.
  const [resources, setResources] = useState<ILinkedResource[] | undefined>([]);
  // Function to load and display resources of the currently selected application.
  const loadAndDisplayResources = useCallback(
    (search?: string) => {
      async function load() {
        if (selectedApplication) {
          try {
            const searchLower = search?.toLowerCase();
            const resources = (
              await loadResources({
                application: selectedApplication.application,
                search,
                types: [selectedApplication.application],
                filters: {},
                pagination: { startIdx: 0, pageSize: 300 }, // ignored at the moment
              })
            )
              .filter((resource) => {
                // Filter in lowercase only
                if (!searchLower || searchLower.length === 0) return true;
                const found =
                  resource.name?.toLowerCase().includes(searchLower) ||
                  resource.creatorName?.toLowerCase().includes(searchLower) ||
                  resource.description?.toLowerCase().includes(searchLower) ||
                  false;
                return found;
              })
              .sort((a, b) => (a.modifiedAt < b.modifiedAt ? 1 : -1));

            setResources(resources);
            return; // end here
          } catch {
            // continue on error
          }
        }
        setResources([]);
      }
      load();
    },
    [loadResources, selectedApplication],
  );

  // List of selected documents
  const [selectedDocuments, setSelectedDocuments] = useState<ILinkedResource[]>(
    [],
  );

  // Notify parent when an application is selected.
  const handleOptionClick = (option: ApplicationOption) => {
    onChange?.(option);
    setSelectedApplication(option);
  };

  // Handle search input events (and debounce)
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setSearchTerms(newText.toString());
  };
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      loadAndDisplayResources(searchTerms);
      event.stopPropagation();
      event.preventDefault();
    },
    [loadAndDisplayResources, searchTerms],
  );

  /**
   * Check if a resource is selected.
   * @returns its index in selectedDocuments, or -1 if not selected.
   */
  const getSelectedResourceIndex = useCallback(
    (resourceId: string) => {
      return selectedDocuments.findIndex(
        (selectedDocument) => selectedDocument.assetId === resourceId,
      );
    },
    [selectedDocuments],
  );

  // Select a resource.
  const selectResource = useCallback(
    (resource: ILinkedResource) => {
      if (multiple) {
        // Add this resource to the previous selected ones.
        setSelectedDocuments((previousState) => [...previousState, resource]);
      } else {
        // Replace previous selection by this resource.
        setSelectedDocuments([resource]);
      }
    },
    [setSelectedDocuments, multiple],
  );

  // Handle [de-]selection of a resource by the user.
  const toggleResourceSelection = useCallback(
    (resource: ILinkedResource) => {
      const index = getSelectedResourceIndex(resource.assetId);
      if (index < 0) {
        selectResource(resource);
      } else {
        // De-select resource (clicked twice)
        setSelectedDocuments(
          selectedDocuments.filter((_value, i) => i !== index),
        );
      }
    },
    [getSelectedResourceIndex, selectResource, selectedDocuments],
  );

  // Update dropdown when available applications list is updated.
  useEffect(() => {
    (async () => {
      const appPromises = resourceApplications.map((application) =>
        odeServices.session().getWebApp(application),
      );
      const webApps = await Promise.all(appPromises);
      setOptions(
        resourceApplications
          .map((application, index) => {
            return {
              application,
              displayName: t(webApps[index]?.displayName ?? application),
              icon: <AppIcon app={webApps[index]}></AppIcon>,
            } as ApplicationOption;
          })
          .sort((app1, app2) =>
            app1.displayName.localeCompare(app2.displayName),
          ),
      );
    })();
  }, [resourceApplications, t]);

  // Load and display search results when debounce is over
  useEffect(() => {
    loadAndDisplayResources(debounceSearch);
  }, [loadAndDisplayResources, debounceSearch]);

  // Notify parent when resources selection changes.
  useEffect(() => {
    onSelect?.(selectedDocuments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDocuments]);

  // Preselect default option and load associated resources, if specified.
  useEffect(() => {
    if (defaultAppCode) {
      const option = options?.find(
        (option) => defaultAppCode === option.application,
      );
      setSelectedApplication(option);
      loadAndDisplayResources('');
    }
    /* Note : when options changes, `defaultAppCode` and `loadAndDisplayResources` are
     * already set at a correct value. So we remove them from the dependency array,
     * otherwise they will provoke side effects forbiding user from changing the selected app.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  // Preselect default resource, if specified.
  useEffect(() => {
    if (defaultResourceId && getSelectedResourceIndex(defaultResourceId) < 0) {
      const resource = resources?.find(
        (resource) => defaultResourceId === resource.assetId,
      );
      resource && selectResource(resource);
    }
    /* Note : when resources changes, `defaultResourceId`, `getSelectedResourceIndex`
     * and `selectResource` are already set at a correct value.
     * So we remove them from the dependency array, otherwise they will provoke side effects
     * forbiding user from changing the selected resources.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources]);

  return (
    <div className="d-flex flex-column flex-fill overflow-hidden">
      <div className="search d-flex bg-light rounded-top border border-bottom-0">
        <div className="flex-shrink-1 px-8 py-12 border-end">
          <Dropdown overflow>
            <Dropdown.Trigger
              icon={
                <div className="pe-8">
                  {selectedApplication?.icon || <Applications />}
                </div>
              }
              label={t(
                selectedApplication?.displayName || 'bbm.linker.int.choose',
              )}
              variant="ghost"
              size="md"
            />
            <Dropdown.Menu>
              {options?.map((option) => (
                <Dropdown.Item
                  key={option.application}
                  icon={option.icon}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.displayName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="flex-grow-1 align-self-center">
          <form
            className="gap-16 d-flex w-100 align-items-center px-16 py-8"
            onSubmit={handleSubmit}
          >
            <SearchBar
              isVariant
              placeholder={t('search')}
              size="lg"
              className="w-100"
              disabled={selectedApplication ? false : true}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      </div>

      <div className="internal-linker flex-grow-1 w-100 rounded-bottom border gap-0 overflow-auto">
        {selectedApplication && resources && resources.length > 0 && (
          <div>
            {resources.map((resource) => {
              const isSelected =
                selectedDocuments.findIndex(
                  (doc) => doc.assetId === resource.assetId,
                ) >= 0;
              return (
                <LinkerCard
                  key={resource.path}
                  doc={resource}
                  isSelected={isSelected}
                  onClick={() => toggleResourceSelection(resource)}
                />
              );
            })}
          </div>
        )}

        {selectedApplication && resources && resources.length <= 0 && (
          <div className="d-flex justify-content-center mt-16">
            <EmptyScreen
              imageSrc={`${imagePath}/${theme?.bootstrapVersion}/illu-empty-search-${selectedApplication.application}.svg`}
              text={t('bbm.linker.int.notfound')}
              className="mt-16"
            />
          </div>
        )}

        {!selectedApplication && (
          <div className="d-flex justify-content-center mt-32">
            <EmptyScreen
              imageSrc={`${imagePath}/${theme?.bootstrapVersion}/illu-empty-search.svg`}
              text={t('bbm.linker.int.empty')}
              className="mt-32"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalLinker;
