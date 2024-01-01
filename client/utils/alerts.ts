interface Error {
  message: string;
}
export const raiseError = (error: any) => {
  const alerts = useAlerts();
  alerts.cleanAlerts();
  error.response._data.forEach((err: Error) => {
    alerts.addAlert("error", err.message);
  });
};
