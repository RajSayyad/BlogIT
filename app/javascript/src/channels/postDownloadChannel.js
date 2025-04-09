import { getFromLocalStorage } from "../utils/storage";

export const subscribeToPostDownloadChannel = ({
  consumer,
  setMessage,
  setProgress,
  generatePdf,
  downloadPdf,
}) => {
  const userId = getFromLocalStorage("authUserId");

  const subscription = consumer.subscriptions.create(
    {
      channel: "PostDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        setMessage("Connected the Cables...");
        generatePdf();
      },
      received(data) {
        const { message, progress, status } = data;
        setMessage(message);
        setProgress(progress);
        if (status === "done") {
          setTimeout(() => {
            downloadPdf();
          }, 3000);
        }
      },
    }
  );

  return () => {
    consumer.subscriptions.remove(subscription);
  };
};
