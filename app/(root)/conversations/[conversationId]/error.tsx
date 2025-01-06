"use client"

import ConversationFallback from "@/app/components/ConversationFallback"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Error({e}: {e:Error}) {
  const router = useRouter()
  useEffect(() => {
    router.push('/conversations')
  }, [e, router])

  return <ConversationFallback/>
}
