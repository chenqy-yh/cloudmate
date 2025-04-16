import { queryApprovalDetail } from "@/apis/approval"
import { ApprovalDetailGeneratorMap, formatApprovalDetail } from "@/pages/approval/config/detail"
import { error } from "@/utils/common"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { ApprovalDetail, ApprovalMap } from ".."

export const useApprovalDetail = () => {
  const location = useLocation()

  const [loading, setIsLoading] = useState(false)
  const [approval_detail, setApprovalDetail] = useState<ApprovalDetail<
    keyof ApprovalMap
  > | null>(null)

  const { ap_code, ap_type, generated_detail } = useMemo(() => {
    const search = new URLSearchParams(location.search)
    const ap_code = search.get("code") || ""
    const ap_type = search.get("ap_type") || ""

    const detail = approval_detail && ApprovalDetailGeneratorMap[ap_type](approval_detail)

    return {
      ap_code,
      ap_type,
      generated_detail: detail,
    }
  }, [approval_detail, location.search])

  useEffect(() => {
    const fetchDetail = async () => {
      if (!ap_code || !ap_type) return
      try {
        setIsLoading(true)
        const response = await queryApprovalDetail(ap_type, ap_code)
        setApprovalDetail(formatApprovalDetail(response.data))
      } catch (err) {
        error("获取审批详情失败")
        console.error("Error fetching approval detail:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetail()
  }, [ap_code, ap_type])
  return {
    loading,
    ap_code,
    ap_type,
    generated_detail,
  }
}
