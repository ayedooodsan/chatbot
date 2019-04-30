const myTrainings = [];
const createTraining = training => myTrainings.push(training);

const connect = Comp => props => (
  <Comp createTraining={createTraining} myTrainings={myTrainings} {...props} />
);

export default connect;
