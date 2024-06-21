import { OdeClientProvider, ThemeProvider } from '@edifice-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { initialize, mswLoader } from 'msw-storybook-addon';
import React, { useEffect } from 'react';

// Initialize MSW
initialize();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const preview = {
  globalTypes: {
    theme: {
      name: 'theme',
      description: 'Select theming',
      defaultValue: 'one',
      toolbar: {
        icon: 'switchalt',
        items: ['one', 'neo', 'side-by-side'],
      },
    },
  },
  parameters: {
    viewMode: 'docs',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          ['Welcome', '*'],
          'Design Tokens',
          'Icons',
          'Components',
          ['Base', '*'],
          'Layouts',
        ],
      },
    },
    msw: {
      handlers: {
        'apps': http.get('/userbook/preference/apps', () => {
          return HttpResponse.json({
            preference: '{"bookmarks":[],"applications":["Blog"]}',
          });
        }),
        'person': http.get('userbook/api/person', () => {
          return HttpResponse.json({
            status: 'ok',
            result: [
              {
                id: 'f6c5ea40',
                login: 'user.admc',
                displayName: 'admc user',
                type: ['Personnel'],
                visibleInfos: [],
                schools: [
                  {
                    exports: null,
                    classes: [],
                    name: 'Édifice',
                    id: 'bfaac2c1',
                    UAI: null,
                  },
                ],
                relatedName: null,
                relatedId: null,
                relatedType: null,
                userId: 'f6c5ea40',
                motto: '',
                photo: '/userbook/avatar/f6c5ea40',
                mood: 'default',
                health: '',
                address: '',
                email: '',
                tel: null,
                mobile: '',
                birthdate: '2023-09-25',
                hobbies: [],
              },
            ],
          });
        }),
        'theme': http.get('/theme', () => {
          return HttpResponse.json({
            template: '/public/template/portal.html',
            logoutCallback: '',
            skin: '/assets/themes/cg77/skins/default/',
            themeName: 'cg77',
            skinName: 'default',
          });
        }),
        'locale': http.get('/locale', () => {
          return HttpResponse.text('fr');
        }),
        'directory': http.get('/directory/userbook/f6c5ea40', () => {
          return HttpResponse.json({
            mood: 'default',
            health: '',
            alertSize: false,
            storage: 27683216,
            type: 'USERBOOK',
            userid: 'f6c5ea40',
            picture: '/userbook/avatar/f6c5ea40',
            quota: 104857600,
            motto: '',
            theme: 'default',
            hobbies: [],
          });
        }),
        'quota': http.get('/workspace/quota/user/f6c5ea40', () => {
          return HttpResponse.json({ quota: 104857600, storage: 27683216 });
        }),
        'userinfo': http.get('/auth/oauth2/userinfo', () => {
          return HttpResponse.json({
            classNames: null,
            level: '',
            login: 'user.admc',
            lastName: 'admc',
            firstName: 'user',
            externalId: 'e4cc33f4-0ad0-444f-8bee-bad0b11c4c9a',
            federated: null,
            birthDate: '2023-09-25',
            forceChangePassword: null,
            needRevalidateTerms: false,
            deletePending: false,
            username: 'admc user',
            type: 'PERSEDUCNAT',
            hasPw: true,
            functions: {
              SUPER_ADMIN: {
                code: 'SUPER_ADMIN',
                scope: null,
              },
            },
            groupsIds: ['326573-1707401228471', '326427-1690981921280'],
            federatedIDP: null,
            optionEnabled: [],
            userId: 'f6c5ea40',
            structures: ['bfaac2c1'],
            structureNames: ['Édifice'],
            uai: [],
            hasApp: false,
            ignoreMFA: true,
            classes: [],
            authorizedActions: [
              {
                name: 'org.entcore.blog.controllers.FoldersController|add',
                displayName: 'blog.createFolder',
                type: 'SECURED_ACTION_WORKFLOW',
              },
              {
                name: 'org.entcore.blog.controllers.FoldersController|list',
                displayName: 'blog.listFolders',
                type: 'SECURED_ACTION_WORKFLOW',
              },
              {
                name: 'org.entcore.blog.controllers.BlogController|print',
                displayName: 'blog.print',
                type: 'SECURED_ACTION_WORKFLOW',
              },
              {
                name: 'org.entcore.blog.controllers.BlogController|blog',
                displayName: 'blog.view',
                type: 'SECURED_ACTION_WORKFLOW',
              },
              {
                name: 'org.entcore.blog.controllers.FoldersControllerProxy|list',
                displayName: 'blog.listFolders',
                type: 'SECURED_ACTION_WORKFLOW',
              },
              {
                name: 'org.entcore.blog.controllers.BlogController|list',
                displayName: 'blog.list',
                type: 'SECURED_ACTION_WORKFLOW',
              },
              {
                name: 'org.entcore.blog.controllers.FoldersControllerProxy|add',
                displayName: 'blog.createFolder',
                type: 'SECURED_ACTION_WORKFLOW',
              },
              {
                name: 'org.entcore.workspace.controllers.WorkspaceController|listDocuments',
                displayName: 'workspace.documents.list',
                type: 'SECURED_ACTION_WORKFLOW',
              },
              {
                name: 'org.entcore.workspace.controllers.WorkspaceController|listFolders',
                displayName: 'workspace.document.list.folders',
                type: 'SECURED_ACTION_WORKFLOW',
              },
            ],
            apps: [
              {
                name: 'Blog',
                address: '/blog',
                icon: 'blog-large',
                target: '',
                displayName: 'blog',
                display: true,
                prefix: '/blog',
                casType: null,
                scope: [''],
                isExternal: false,
              },
            ],
            childrenIds: [],
            children: {},
            widgets: [],
            sessionMetadata: {},
          });
        }),
        'rgpdCookies': http.get('/userbook/preference/rgpdCookies', () => {
          return HttpResponse.json({ preference: '{"showInfoTip":false}' });
        }),
        'application-list': http.get('/applications-list', () => {
          return HttpResponse.json({
            apps: [
              {
                name: 'Blog',
                address: '/blog',
                icon: 'blog-large',
                target: '',
                displayName: 'blog',
                display: true,
                prefix: '/blog',
                casType: null,
                scope: [''],
                isExternal: false,
              },
            ],
          });
        }),
        'theme-conf': http.get('/assets/theme-conf.js', () => {
          return HttpResponse.json({
            overriding: [
              {
                parent: 'theme-open-ent',
                child: 'cg77',
                skins: ['default', 'dyslexic'],
                help: '/help-2d',
                bootstrapVersion: 'ode-bootstrap-one',
                edumedia: {
                  uri: 'https://www.edumedia-sciences.com',
                  pattern: 'uai-token-hash-[[uai]]',
                  ignoreSubjects: ['n-92', 'n-93'],
                },
              },
              {
                parent: 'panda',
                child: 'cg771d',
                skins: [
                  'circus',
                  'desert',
                  'neutre',
                  'ocean',
                  'panda-food',
                  'sparkly',
                  'default',
                  'monthly',
                ],
                help: '/help-1d',
                bootstrapVersion: 'ode-bootstrap-one',
                edumedia: {
                  uri: 'https://junior.edumedia-sciences.com',
                  pattern: 'uai-token-hash-[[uai]]',
                },
              },
            ],
          });
        }),
      },
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      useEffect(() => {
        if (theme) {
          document?.querySelector(':root')?.setAttribute('data-product', '');
          // ${theme}
        }
      }, []);

      switch (theme) {
        case 'side-by-side': {
          return (
            <QueryClientProvider client={queryClient}>
              <OdeClientProvider
                params={{
                  app: 'blog',
                }}
              >
                <ThemeProvider>
                  <div data-product="one" className="my-12">
                    <Story />
                  </div>
                  <div data-product="neo" className="my-12">
                    <Story />
                  </div>
                </ThemeProvider>
              </OdeClientProvider>
            </QueryClientProvider>
          );
        }
        default: {
          return (
            <QueryClientProvider client={queryClient}>
              <OdeClientProvider
                params={{
                  app: 'blog',
                }}
              >
                <ThemeProvider>
                  <div data-product={theme}>
                    <Story />
                  </div>
                </ThemeProvider>
              </OdeClientProvider>
            </QueryClientProvider>
          );
        }
      }

      /* return (
        <div data-product={theme}>
          <QueryClientProvider client={queryClient}>
            <OdeClientProvider
              params={{
                app: 'blog',
              }}
            >
              <ThemeProvider>
                <Story />
              </ThemeProvider>
            </OdeClientProvider>
          </QueryClientProvider>
        </div>
      ) */
    },
  ],
};

export default preview;
