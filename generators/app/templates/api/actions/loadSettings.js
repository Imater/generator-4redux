const initialState = {
  data: {
    companyName: 'test name'
  }
};

export default function loadSettings() {
  return Promise.resolve(initialState);
}
