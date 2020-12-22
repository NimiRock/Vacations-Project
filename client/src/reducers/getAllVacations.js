const getAllVacations = (state = [], action) => {
    switch(action.type){
        case 'GET_VACATIONS':
            return action.payload;
        
        default:
            return state
    };
};

export default getAllVacations;