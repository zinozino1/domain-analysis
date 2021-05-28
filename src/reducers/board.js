import { createAction, handleActions } from "redux-actions";

//  initial  state

export const initialState = {
  board: null,
  boardLoading: false,
  boardDone: false,
  boardError: null,
  boardList: null,
  boardListLoading: false,
  boardListDone: false,
  boardListError: null,
  boardMember: null,
};

// action type

export const INITIALIZE_BOARD = "board/INITIALIZE_BOARD";
export const INITIALIZE_BOARD_LIST = "board/INITIALIZE_BOARD_LIST";

export const LOAD_BOARD_REQUEST = "board/LOAD_BOARD_REQUEST";
export const LOAD_BOARD_SUCCESS = "board/LOAD_BOARD_SUCCESS";
export const LOAD_BOARD_FAILURE = "board/LOAD_BOARD_FAILURE";

export const LOAD_BOARD_LIST_REQUEST = "board/LOAD_BOARD_LIST_REQUEST";
export const LOAD_BOARD_LIST_SUCCESS = "board/LOAD_BOARD_LIST_SUCCESS";
export const LOAD_BOARD_LIST_FAILURE = "board/LOAD_BOARD_LIST_FAILURE";

export const ADD_BOARD_REQUEST = "board/ADD_BOARD_REQUEST";
export const ADD_BOARD_SUCCESS = "board/ADD_BOARD_SUCCESS";
export const ADD_BOARD_FAILURE = "board/ADD_BOARD_FAILURE";

export const DELETE_BOARD_REQUEST = "board/DELETE_BOARD_REQUEST";
export const DELETE_BOARD_SUCCESS = "board/DELETE_BOARD_SUCCESS";
export const DELETE_BOARD_FAILURE = "board/DELETE_BOARD_FAILURE";

export const DELETE_BOARD_MEMBER_REQUEST = "board/DELETE_BOARD_MEMBER_REQUEST";
export const DELETE_BOARD_MEMBER_SUCCESS = "board/DELETE_BOARD_MEMBER_SUCCESS";
export const DELETE_BOARD_MEMBER_FAILURE = "board/DELETE_BOARD_MEMBER_FAILURE";
// action creator

export const initializeBoardRequestAction = createAction(INITIALIZE_BOARD);

export const initializeBoardListRequestAction = createAction(
  INITIALIZE_BOARD_LIST,
);

export const loadBoardRequestAction = createAction(LOAD_BOARD_REQUEST);

export const loadBoardListRequestAction = createAction(LOAD_BOARD_LIST_REQUEST);

export const addBoardRequestAction = createAction(
  ADD_BOARD_REQUEST,
  (data) => data, //이게 saga한테 action으로 처리되는거같은데 맞나여?
);

// 영진 생각
// board에서 createBoard를 data로 건너주면서 addBoardRequestAction호출
// saga에서 watchBoard로 REQUEST를 CATCH해서 addBoardSaga실행
// addBoardSaga에서는 createBoard를 addBoardRequestAction에서 data로 받은것을
// action.payload로 받아낼수 있음
// action.payload를 res로 저장해서 res를 반환해주면
// success에서 (action.res = 새로생성한 board)를 받아서
// concat을 사용해서 배열 추가

// delete도 똑같이
export const deleteBoardRequestAction = createAction(
  DELETE_BOARD_REQUEST,
  (data) => data,
);

export const deleteBoardMemberRequestAction = createAction(
  DELETE_BOARD_MEMBER_REQUEST,
  (data) => data,
);
// reducer

const board = handleActions(
  {
    [INITIALIZE_BOARD]: (state, action) => ({ ...state, board: null }),
    [INITIALIZE_BOARD_LIST]: (state, action) => ({ ...state, boardList: null }),
    [LOAD_BOARD_REQUEST]: (state, action) => ({
      ...state,
      boardLoading: true,
      boardDone: false,
      boardError: null,
    }),
    [LOAD_BOARD_SUCCESS]: (state, action) => ({
      ...state,
      boardLoading: false,
      boardDone: true,
      boardError: null,
      board: action.board,
    }),
    [LOAD_BOARD_FAILURE]: (state, action) => ({
      ...state,
      boardLoading: false,
      boardDone: false,
      boardError: "error",
    }),
    [LOAD_BOARD_LIST_REQUEST]: (state, action) => ({
      ...state,
      boardListLoading: true,
      boardListDone: false,
      boardListError: null,
    }),
    [LOAD_BOARD_LIST_SUCCESS]: (state, action) => ({
      ...state,
      boardListLoading: false,
      boardListDone: true,
      boardListError: null,
      boardList: action.boardList,
    }),
    [LOAD_BOARD_LIST_FAILURE]: (state, action) => ({
      ...state,
      boardListLoading: false,
      boardListDone: false,
      boardListError: "error",
    }),
    [ADD_BOARD_REQUEST]: (state, action) => ({
      ...state,
    }),
    [ADD_BOARD_SUCCESS]: (state, action) => {
      return {
        ...state,
        boardList: {
          ...state.boardList,
          boardList: [...state.boardList.boardList].concat(action.res),
        },
      };
    },
    [ADD_BOARD_FAILURE]: (state, action) => ({
      ...state,
    }),
    [DELETE_BOARD_REQUEST]: (state, action) => ({
      ...state,
    }),
    [DELETE_BOARD_SUCCESS]: (state, action) => {
      return {
        ...state,
        boardList: {
          ...state.boardList,
          boardList: state.boardList.boardList.filter(
            (v, i) => v.boardName !== action.res,
          ),
        },
      };
    },
    [DELETE_BOARD_FAILURE]: (state, action) => ({
      ...state,
    }),
    [DELETE_BOARD_MEMBER_REQUEST]: (state, action) => ({
      ...state,
    }),
    [DELETE_BOARD_MEMBER_SUCCESS]: (state, action) => {
      console.log(action.res);
      return {
        ...state,
        boardList: [...state.boardList].filter((v, i) => {
          console.log(v);
          if (v.boardName === action.res.boardName) {
            return { ...v };
          }
        }), //[0]
        // .member.filter((v2, i2) => {
        //   {
        //     if (!action.res.deletedMember.includes(i2)) {
        //       return { ...v2 };
        //     }
        //   }
        // }),
      };
    },
    [DELETE_BOARD_MEMBER_FAILURE]: (state, action) => ({
      ...state,
    }),
  },
  initialState,
);

// export

export default board;
