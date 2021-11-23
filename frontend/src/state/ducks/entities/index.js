import types from './types';

const allEntities = [];

const defaultState = allEntities.reduce((acc, entity) => ({
    ...acc,
    [entity]: {
        byId: {},
        allIds: []
    }
}), {});

const entityReducer = (entity, state = {byId: {}, allIds: []}, action) => {
    
    const actionEntities = action.payload[entity];
    const {actionType} = action.meta;

    switch (actionType) {
        case types.GET_ALL:
            return {
                byId: {
                    ...Object.keys(actionEntities).reduce((acc, id) => ({
                        ...acc,
                        [id]: {
                            ...state.byId[id],
                            ...actionEntities[id]
                        }
                    }), {})
                },
                allIds: Object.keys(actionEntities).reduce((allIds, id) => [...allIds, id]
                , [])
            };
        
            case types.GET_ONE:
                return {
                    byId: {
                        ...state.byId,
                        ...Object.keys(actionEntities).reduce((acc, id) => ({
                                ...acc,
                                [id]: {
                                    ...state.byId[id],
                                    ...actionEntities[id]
                                }
                            }), 
                            {}
                        )
                    },
                    allIds: Object.keys(actionEntities).reduce(
                        (allIds, id) => (allIds.includes(id) ? allIds : [...allIds, id]),
                        state.allIds
                    )
                };
            
            case types.DELETE_ONE:              
                return {
                    byId: Object.keys(state.byId).reduce(
                        (acc, id) => {
                            if ( Object.keys(actionEntities).includes(id)) {
                                return acc;

                            } else {
                                return {
                                    ...acc,
                                    [id]: {
                                        ...state.byId[id]
                                    }
                                };

                            };
                        },
                        {}
                    ),
                    allIds: Object.keys(actionEntities).reduce(
                        (allIds, id) => (allIds.includes(id) ? allIds.filter(x => x !== id) : allIds),
                        state.allIds
                    )
                };
        
            default:
                console.log(`ERROR! UNSUPPORTED TYPE: ${actionType}`);

    };
};

const entities = (state = defaultState, action) => {
    if (!action.meta || !action.meta.actionType) {
        return state;
        
    }

    return {
        ...state,
        ...Object.keys(action.payload).reduce(
            (acc, entity) => ({
                ...acc,
                [entity]: entityReducer(entity, state[entity], action)
            }), {})
    };     
    
};

const entitiesReducer = { entities };

export default entitiesReducer;
