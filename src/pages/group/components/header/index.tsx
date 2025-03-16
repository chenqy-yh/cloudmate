import FloatIndicator, {
  OptionChangeHandler,
} from "@/components/float-indicator";
import Taro from "@tarojs/taro";

const GroupHeader = () => {
  const menuBtnPos = Taro.getMenuButtonBoundingClientRect();

  const list = [
    {
      value: 0,
      text: "团队",
    },
    {
      value: 1,
      text: "客户",
    },
  ];

  const handleOptionChange: OptionChangeHandler = (e) => {
    console.log("change:", e.value);
  };

  return (
    <div
      style={{
        marginTop: `${menuBtnPos.top}px`,
      }}
    >
      <FloatIndicator options={list} onChange={handleOptionChange} />
    </div>
  );
};

export default GroupHeader;
