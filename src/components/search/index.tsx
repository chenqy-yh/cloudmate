import { Input, InputProps } from "@tarojs/components";
import classNames from "classnames";
import React from "react";
import Icon from "../icon/common";
import styles from "./index.module.scss";

type SearchInputProps = {
  value: string;
} & InputProps;

const SearchBar: React.FC<SearchInputProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <div className={classNames(className, styles.search_bar)}>
      <Icon icon="search" size={20} />
      <Input {...rest} className={styles.inner_input} />
    </div>
  );
};

export default SearchBar;
