export default (state, action) => {
  switch (action.type) {
    case 'INIT':
      console.log(action.payload)
      return {
        ...state,
        file: action.payload
      }
  }
}