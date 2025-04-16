import { signIn } from "@/apis/auth"
import { POST_SUCCESS } from "@/apis/constants"
import Loader from "@/components/loading/icon"
import { AppDispatch } from "@/store"
import { setAuthData } from "@/store/reducers/auth"
import { error } from "@/utils/common"
import { Button, Input } from "@tarojs/components"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.scss"

const LoginPage = () => {
  const [signInLoading, setSignInLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    phone: "13344445555",
    password: "yinhan",
  })

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleInputChange = (field: "phone" | "password") => (e) => {
    setCredentials((prev) => ({ ...prev, [field]: e.detail.value }))
  }

  const handleSignIn = async () => {
    setSignInLoading(true)
    try {
      const { statusCode, data, errMsg } = await signIn(credentials.phone, credentials.password)
      if (statusCode === POST_SUCCESS) {
        dispatch(
          setAuthData({
            Authorization: `Bearer ${data.access_token}`,
            "x-unique-device-token": data["x-unique-device-token"],
            "x-user-uuid": data["x-user-uuid"],
          })
        )
        navigate("/")
      } else {
        error(statusCode === 401 ? "用户名或密码错误" : "网络异常")
        console.error(errMsg)
      }
    } catch (err) {
      error("登录失败")
      console.log(err)
    } finally {
      setSignInLoading(false)
    }
  }

  return (
    <div className={styles.login_body}>
      <div className={styles.title_body}>
        <div className={styles.title_1}>欢迎登录Cloudmate</div>
        <div className={styles.title_2}>云协协作办公app</div>
      </div>
      <div className={styles.form_body}>
        <div className={styles.phone}>
          <Input
            className={styles.inner_input}
            placeholder="请输入手机号"
            type="number"
            placeholderClass={styles.inner_input_placeholder}
            value={credentials.phone}
            onInput={handleInputChange("phone")}
          />
        </div>
        <div className={styles.password}>
          <Input
            className={styles.inner_input}
            password
            type="text"
            placeholder="请输入密码"
            placeholderClass={styles.inner_input_placeholder}
            value={credentials.password}
            onInput={handleInputChange("password")}
          />
        </div>
      </div>
      <Button className={styles.sign_in} hoverClass={styles.sign_in_active} onClick={handleSignIn} disabled={signInLoading}>
        {signInLoading ? <Loader version={1} /> : "登录"}
      </Button>
      <div className={styles.forget_pw}>忘记密码</div>
    </div>
  )
}

export default LoginPage
