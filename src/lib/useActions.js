//[[[컴포넌트설명]]]
//468 util함수 따로 파일로 빼서 dispatch 작업을 가독성좋게 따로 만들파일
//467 dispatch 액션생성함수가 여러개 있을때 가독성 좋게 하기위해서 별도로 만든 파일
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

export default function useActions(actions, deps) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [dispatch, ...deps] : deps
  );
}
