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
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return () => {
    consumer.subscriptions.remove(subscription);
    setTimeout(() => {
      downloadPdf();
    }, 3000);
  };
};
