import { useTranslation } from "react-i18next";
import { Modal } from "../Modal";
import { ViewsDetail } from "./models/Views";
import { createPortal } from "react-dom";
import { Button } from "../Button";
import { See, Users } from "@edifice-ui/icons";
import {
  Guest,
  Student,
  Parent,
  Teacher,
  Personal,
} from "@edifice-ui/icons/views";

export interface ViewsModalProps {
  viewsDetail: ViewsDetail;
  isOpen: boolean;
  onModalClose: () => void;
}

const ViewsModal = ({ viewsDetail, isOpen, onModalClose }: ViewsModalProps) => {
  const { t } = useTranslation();

  return createPortal(
    <Modal id="ViewsModal" isOpen={isOpen} onModalClose={onModalClose}>
      <Modal.Header onModalClose={onModalClose}>
        {t("audience.views.title")}
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="d-flex align-items-center views-detail-line p-8 mb-12 gap-12 ">
            <div className="views-detail-icon rounded p-8">
              <See />
            </div>
            <div className="h3">{viewsDetail.totalViews}</div>
            <div>{t("audience.views.detail.counterTotal")}</div>
          </div>
          <div className="d-flex align-items-center views-detail-line p-8 mb-12 gap-12 ">
            <div className="views-detail-icon rounded p-8">
              <Users />
            </div>
            {viewsDetail.totalUniqueViews !== undefined && (
              <>
                <div className="h3">{viewsDetail.totalUniqueViews}</div>
                <div>{t("audience.views.detail.counterTotalUnique")}</div>
              </>
            )}
            {viewsDetail.totalUniqueViews === undefined && (
              <div>{t("audience.views.detail.noUniqueViews")}</div>
            )}
          </div>
          {viewsDetail.counterDetails?.students !== 0 && (
            <div className="d-flex align-items-center views-detail-line p-8 ms-32 mb-12 gap-12 ">
              <div className="views-detail-icon rounded views-detail-icon-student p-8">
                <Student />
              </div>
              <div className="h4">{viewsDetail.counterDetails?.students}</div>
              <div>{t("audience.views.detail.students")}</div>
            </div>
          )}
          {viewsDetail.counterDetails?.parents !== 0 && (
            <div className="d-flex align-items-center views-detail-line p-8 ms-32 mb-12 gap-12 ">
              <div className="views-detail-icon rounded views-detail-icon-parent p-8">
                <Parent />
              </div>
              <div className="h4">{viewsDetail.counterDetails?.parents}</div>
              <div>{t("audience.views.detail.parents")}</div>
            </div>
          )}
          {viewsDetail.counterDetails?.teachers !== 0 && (
            <div className="d-flex align-items-center views-detail-line p-8 ms-32 mb-12 gap-12 ">
              <div className="views-detail-icon rounded views-detail-icon-teacher p-8">
                <Teacher />
              </div>
              <div className="h4">{viewsDetail.counterDetails?.teachers}</div>
              <div>{t("audience.views.detail.teachers")}</div>
            </div>
          )}
          {viewsDetail.counterDetails?.personal !== 0 && (
            <div className="d-flex align-items-center views-detail-line p-8 ms-32 mb-12 gap-12 ">
              <div className="views-detail-icon rounded views-detail-icon-personal p-8">
                <Personal />
              </div>
              <div className="h4">{viewsDetail.counterDetails?.personal}</div>
              <div>{t("audience.views.detail.personal")}</div>
            </div>
          )}
          {viewsDetail.counterDetails?.guest !== 0 && (
            <div className="d-flex align-items-center views-detail-line p-8 ms-32 mb-12 gap-12 ">
              <div className="views-detail-icon rounded views-detail-icon-guest p-8">
                <Guest />
              </div>
              <div className="h4">{viewsDetail.counterDetails?.guest}</div>
              <div>{t("audience.views.detail.guest")}</div>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="primary"
          onClick={onModalClose}
          type="button"
          variant="filled"
        >
          {t("audience.views.cancel")}
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById("portal") as HTMLElement,
  );
};

ViewsModal.displayName = "ViewsModal";

export default ViewsModal;
