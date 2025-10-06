import {
  Accordion,
  Button,
  Editor,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import {
  useGetUsersMeCampaignsByCampaignIdTasksQuery,
  usePostUsersMeCampaignsByCampaignIdTasksAndTaskIdMutation,
} from "src/services/tryberApi";
import { styled } from "styled-components";
import { MediaDropzone } from "./MediaDropzone";

const Todo = styled.span`
  font-size: 0.6rem;
  vertical-align: middle;
  padding-right: 0.3rem;
`;

const UseCases = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const { data } = useGetUsersMeCampaignsByCampaignIdTasksQuery(
    { campaignId: id },
    { skip: !id }
  );

  const [updateTask] =
    usePostUsersMeCampaignsByCampaignIdTasksAndTaskIdMutation();

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <Accordion initialActive={""}>
          {data.map((task) => (
            <Accordion.Item
              key={task.id}
              id={`task.${task.id}`}
              title={
                <span>
                  {task.status === "pending" && <Todo>TODO</Todo>}
                  {task.status === "completed" && <Todo>✓</Todo>}
                  <>{task.name}</>
                </span>
              }
            >
              <div className="aq-mb-3">
                <Editor editable={false}>{task.content}</Editor>
                {task.can_upload_media && (
                  <div className="aq-mt-2 ">
                    <MediaDropzone
                      taskId={task.id.toString()}
                      campaignId={id}
                    />
                  </div>
                )}
              </div>
              <Button
                kind="success"
                onClick={() =>
                  updateTask({
                    campaignId: id,
                    taskId: task.id.toString(),
                    body: { status: "completed" },
                  })
                }
                disabled={task.status === "completed"}
              >
                {task.status === "completed"
                  ? t("Task completed")
                  : t("Mark as completed")}
              </Button>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export { UseCases };
