"use client"

import { useState, useMemo } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  User,
  Pagination,
  type ChipProps,
  type SortDescriptor,
  Tooltip,
  Spinner,
} from "@nextui-org/react"
import { Plus, Search, FileDown, FileUp, Edit, Eye, History } from "lucide-react"
import { Alarm } from "@/types/alarm"
import { CgProfile } from "react-icons/cg";

const severityColorMap: Record<string, ChipProps["color"]> = {
  p1: "danger",
  p2: "warning",
  p3: "primary",
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  open: "warning",
  closed: "success",
}

const columns = [
  { name: "TICKET ID", uid: "ticketId" },
  { name: "SEVERITY", uid: "severity" },
  { name: "ASSIGNED TO", uid: "assignedPerson" },
  { name: "CREATED", uid: "alarmCreationTime" },
  { name: "DESCRIPTION", uid: "alarmDescription" },
  { name: "DEPARTMENT", uid: "department" },
  { name: "STATUS", uid: "alarmStatus" },
  { name: "ACTIONS", uid: "actions" },
]

const INITIAL_VISIBLE_COLUMNS = [
  "ticketId",
  "severity",
  "assignedPerson",
  "alarmCreationTime",
  "alarmDescription",
  "department",
  "alarmStatus",
  "actions",
]

export function AlarmTable({ alarms, loading, error }: { alarms: Alarm[], loading: boolean, error: string | null }) {
  const [filterValue, setFilterValue] = useState("")
  const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS))
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "alarmCreationTime",
    direction: "descending",
  })
  const [page, setPage] = useState(1)

  console.log('alarmincid', alarms)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = useMemo(() => {
    let filteredAlarms = alarms && [...alarms]

    if (hasSearchFilter) {
      filteredAlarms = filteredAlarms.filter(
        (alarm) =>
          alarm.ticketId?.toLowerCase().includes(filterValue.toLowerCase()) ||
          alarm.alarmDescription.toLowerCase().includes(filterValue.toLowerCase()) ||
          alarm.assignedPerson.toLowerCase().includes(filterValue.toLowerCase()) ||
          alarm.department.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }

    return filteredAlarms
  }, [alarms, filterValue])

  const pages = Math.ceil(filteredItems?.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems?.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderCell = (alarm: Alarm, columnKey: React.Key) => {
    switch (columnKey) {
      case "severity":
        return (
          <Chip className="capitalize" color={severityColorMap[alarm.severity]} size="sm" variant="flat">
            {alarm.severity.toUpperCase()}
          </Chip>
        )
      case "assignedPerson":
        return (
            <div className="flex gap-3">
                <CgProfile />
                <p>{alarm.assignedPerson}</p>

                </div>
        //   <User
        //     name={alarm.assignedPerson}
        //     avatarProps={{
        //       src: `https://i.pravatar.cc/150?u=${alarm.assignedPerson.replace(" ", "")}`,
        //     }}
        //   />
        )
      case "alarmCreationTime":
        return formatDate(alarm.alarmStartDate)
      case "alarmDescription":
        return (
          <Tooltip
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Description</div>
                <div className="text-tiny">{alarm.alarmDescription}</div>
              </div>
            }
          >
            <span className="cursor-help truncate max-w-xs inline-block">{alarm.alarmDescription}</span>
          </Tooltip>
        )
      case "alarmStatus":
        return (
          <Chip className="capitalize" color={statusColorMap[alarm.alarmStatus]} size="sm" variant="dot">
            {alarm.alarmStatus.toUpperCase()}
          </Chip>
        )
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="View Details">
              <Button isIconOnly size="sm" variant="light">
                <Eye className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Edit Incident">
              <Button isIconOnly size="sm" variant="light">
                <Edit className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip content="View Timeline">
              <Button isIconOnly size="sm" variant="light">
                <History className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        )
      default:
        return alarm[columnKey as keyof Alarm]
    }
  }

  const onSearchChange = (value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue("")
    }
  }

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search alarms..."
            startContent={<Search className="h-4 w-4" />}
            value={filterValue}
            onClear={() => onSearchChange("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button variant="flat" startContent={<FileDown className="h-4 w-4" />}>
              Export
            </Button>
            <Button variant="flat" startContent={<FileUp className="h-4 w-4" />}>
              Import
            </Button>
          </div>
        </div>
      </div>
    )
  }, [filterValue])

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <span className="text-small text-default-400">{filteredItems?.length} alarms</span>
      </div>
    )
  }, [filteredItems?.length, page, pages])

  if (error) {
    return <div className="text-danger flex justify-center items-center font-extrabold text-3xl pt-28">Error: {error}</div>
  }

  return (
    <Table
      aria-label="Alarm table"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[calc(100vh-300px)]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.uid !== "actions"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading = {loading}
        items={items}
        loadingContent={<Spinner label="Loading..." color="success"/>}
        emptyContent={"No Alarms found"}
      >
        {(item) => (
          <TableRow key={item.ticketId || item.ticketId || Math.random()}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}