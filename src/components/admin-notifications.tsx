"use client"

import { useEffect, useState, useRef } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { format } from "date-fns"

interface NewOrder {
  id: string
  orderNumber: string
  customerEmail: string
  total: number
  createdAt: string
  status: string
}

export function AdminNotifications() {
  const [newOrders, setNewOrders] = useState<NewOrder[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [lastCheck, setLastCheck] = useState<Date>(new Date())
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Check for new orders every 30 seconds
  useEffect(() => {
    // Initialize audio for notification sound
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqvn77FgGAg+ltryxnMpBSyAzvLaiTcIGWi77eefTRAMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEAKFF606+uoVRQKRp/g8r5sIQUxh9Hz04IzBh5uwO/jmUgND1ar5++xYBgIPpba8sZzKQUsgM7y2ok3CBlou+3nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBAA')
    }

    const checkNewOrders = async () => {
      try {
        const response = await fetch(`/api/admin/new-orders?since=${lastCheck.toISOString()}`)
        if (!response.ok) return

        const orders = await response.json()

        if (orders.length > 0) {
          setNewOrders(prev => [...orders, ...prev].slice(0, 10)) // Keep last 10
          setUnreadCount(prev => prev + orders.length)

          // Play notification sound
          if (audioRef.current) {
            audioRef.current.play().catch(() => {
              // Ignore audio play errors (user interaction required)
            })
          }

          // Show browser notification if permitted
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New Order Received!', {
              body: `${orders.length} new order${orders.length > 1 ? 's' : ''} - ${orders[0].orderNumber}`,
              icon: '/favicon.ico',
              tag: 'new-order',
            })
          }
        }

        setLastCheck(new Date())
      } catch (error) {
        console.error('Failed to check for new orders:', error)
      }
    }

    // Request notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    // Initial check
    checkNewOrders()

    // Set up polling interval (30 seconds)
    const interval = setInterval(checkNewOrders, 30000)

    return () => clearInterval(interval)
  }, [lastCheck])

  const handleMarkAsRead = () => {
    setUnreadCount(0)
  }

  const handleClearAll = () => {
    setNewOrders([])
    setUnreadCount(0)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={handleMarkAsRead}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">New Orders</h3>
          {newOrders.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="h-auto p-0 text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {newOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p className="text-sm">No new orders</p>
              <p className="text-xs mt-1">New orders will appear here</p>
            </div>
          ) : (
            <div className="divide-y">
              {newOrders.map((order) => (
                <Link
                  key={order.id}
                  href="/admin/orders"
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">#{order.orderNumber}</p>
                      <p className="text-xs text-gray-600">{order.customerEmail}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-[#d4a055]">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(order.createdAt), 'p')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
