"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, ShoppingBag, MessageSquare, Search, Mail, Calendar, DollarSign } from "lucide-react"
import { format, parseISO } from 'date-fns'
import { AdminNotifications } from "@/components/admin-notifications"

interface User {
  id: string
  discordId: string
  name: string | null
  email: string | null
  image: string | null
  createdAt: string
  updatedAt: string
  orderCount: number
  commentCount: number
  totalSpent: number
}

interface UsersData {
  users: User[]
  totalUsers: number
}

export default function UsersPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<UsersData | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchUsers()
    } else {
      router.push('/admin')
    }
  }, [router])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const usersData = await response.json()
      setData(usersData)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading users...</p>
      </div>
    )
  }

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`
  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'MMM dd, yyyy')
    } catch {
      return dateStr
    }
  }

  const filteredUsers = data?.users.filter(user => {
    const query = searchQuery.toLowerCase()
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.discordId.toLowerCase().includes(query)
    )
  }) || []

  const totalSpent = data?.users.reduce((sum, user) => sum + user.totalSpent, 0) || 0
  const totalOrders = data?.users.reduce((sum, user) => sum + user.orderCount, 0) || 0
  const totalComments = data?.users.reduce((sum, user) => sum + user.commentCount, 0) || 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Discord Users</h1>
                <p className="text-gray-600">All users who have signed in with Discord</p>
              </div>
            </div>
            <AdminNotifications />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.totalUsers || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Registered via Discord
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  Across all users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#d4a055]">
                  {formatCurrency(totalSpent)}
                </div>
                <p className="text-xs text-muted-foreground">
                  From all users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalComments}</div>
                <p className="text-xs text-muted-foreground">
                  Blog comments
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>User Directory</CardTitle>
                  <CardDescription>Complete list of all Discord authenticated users</CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {searchQuery ? 'No users found matching your search.' : 'No users have signed in yet.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Discord ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Orders</TableHead>
                        <TableHead className="text-center">Comments</TableHead>
                        <TableHead className="text-right">Total Spent</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {user.image ? (
                                <Image
                                  src={user.image}
                                  alt={user.name || 'User'}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <Users className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{user.name || 'Unknown'}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {user.discordId}
                            </code>
                          </TableCell>
                          <TableCell>
                            {user.email ? (
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{user.email}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">Not provided</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {user.orderCount > 0 ? (
                              <Badge variant="secondary">{user.orderCount}</Badge>
                            ) : (
                              <span className="text-gray-400">0</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {user.commentCount > 0 ? (
                              <Badge variant="outline">{user.commentCount}</Badge>
                            ) : (
                              <span className="text-gray-400">0</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {user.totalSpent > 0 ? (
                              <span className="text-[#d4a055]">{formatCurrency(user.totalSpent)}</span>
                            ) : (
                              <span className="text-gray-400">$0.00</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              {formatDate(user.createdAt)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Link href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
            <Link href="/admin/analytics">
              <Button variant="outline">View Analytics</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
