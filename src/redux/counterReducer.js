const defaultState = [];

function counterReducer(state = defaultState, actions) {
  if (actions.type == "ADD") {
    let copied = JSON.parse(JSON.stringify(state));
    copied.push(actions.payload);
    return copied;
  } else if (actions.type == "DELETE") {
    let copied = JSON.parse(JSON.stringify(state));
    copied = copied.filter((el) => {
      return el.id != actions.payload;
    });
    return copied;
  } else {
    return state;
  }
}

export default counterReducer;
