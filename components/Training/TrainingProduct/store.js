let training = {};
const deleteTraining = () => null;
const updateTraining = newTraining => {
  training = newTraining;
};

const connect = Comp => props => (
  <div>
    <Comp
      training={training}
      deleteTraining={deleteTraining}
      updateTRaining={updateTraining}
      {...props}
    />
  </div>
);

export default connect;
