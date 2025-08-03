import { Loader } from "@components/Loader/Loader";

import { useAppSelector } from "@redux/store";
import { getIsShowLoader } from "@redux/ulSlice/selectors";

export const LoaderContainer = () => {
  const isShowLoader = useAppSelector(getIsShowLoader);
  return <>{isShowLoader ? <Loader /> : null}</>;
};
