let training = {
  id: '1',
  title: 'Dialog A',
  userSays: [
    {
      actionStatus: 'delete',
      intentResult: {
        id: '5cbeb37b62dc764f0720b6d2',
        title: 'Lokasi yang dikunjungi'
      },
      text: 'Selamat datang di kota pekanbaru',
      entityRanges: [
        {
          offset: 8,
          length: 6,
          entity: {
            id: '5cbe84aa1f24d91d691ddffb',
            title: 'Buah'
          }
        },
        {
          offset: 23,
          length: 9,
          entity: {
            id: '5cbd703aa2084f67299d8a24',
            title: 'Kota'
          }
        }
      ],
      params: [
        {
          name: 'Buah',
          entity: {
            id: '5cbe84aa1f24d91d691ddffb',
            title: 'Buah'
          }
        },
        {
          name: 'Kota',
          entity: {
            id: '5cbd703aa2084f67299d8a24',
            title: 'Kota'
          }
        }
      ]
    },
    {
      actionStatus: null,
      intentResult: {
        id: '5cc66d18f38909220b15d2c4',
        title: 'Tempat Tinggal'
      },
      text: 'Saya baru saja nonton End Game',
      entityRanges: [
        {
          offset: 22,
          length: 8,
          entity: {
            id: '5cc676cda9252b42d237aa3a',
            title: 'Movies'
          }
        }
      ],
      params: [
        {
          name: 'Movies',
          entity: {
            id: '5cc676cda9252b42d237aa3a',
            title: 'Movies'
          }
        }
      ]
    }
  ]
};
const deleteTraining = () => null;
const updateTraining = newTraining => {
  training = newTraining;
};

const connect = Comp => props => (
  <div>
    <Comp
      training={training}
      deleteTraining={deleteTraining}
      updateTraining={updateTraining}
      {...props}
    />
  </div>
);

export default connect;
