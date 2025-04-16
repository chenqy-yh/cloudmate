import { getFileList } from "@/apis/share";
import { setFileList } from "@/store/reducers/file";
import { selectPath } from "@/store/selectors/file";
import { error } from "@/utils/common";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchFileList = (version: number) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const file_path = useSelector(selectPath);

  const fetchFileList = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data: req_file_list } = await getFileList(file_path);
      dispatch(setFileList(req_file_list));
    } catch (err) {
      error(err.name);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, file_path, setLoading]);

  useEffect(() => {
    fetchFileList();
  }, [fetchFileList, version]);
  return { loading, setLoading };
}
