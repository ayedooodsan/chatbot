const myTrainings = [
  {
    id: '0',
    title: 'Dialog A',
    date: '2019-04-30'
  },
  {
    id: '1',
    title: 'Dialog B',
    date: '2019-05-01'
  }
];
const createTraining = training => myTrainings.push(training);

const connect = Comp => props => (
  <Comp createTraining={createTraining} myTrainings={myTrainings} {...props} />
);

export default connect;
