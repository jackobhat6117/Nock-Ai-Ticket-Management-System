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
} from "@nextui-org/react"
import { Plus, Search, FileDown, FileUp, Edit, Eye, History } from "lucide-react"
import type { Incident } from "@/types/incident"

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
  { name: "INCIDENT ID", uid: "incidentId" },
  { name: "SEVERITY", uid: "severity" },
  { name: "ASSIGNED TO", uid: "assignedPerson" },
  { name: "CREATED", uid: "incidentCreationTime" },
  { name: "DESCRIPTION", uid: "alarmDescription" },
  { name: "DEPARTMENT", uid: "department" },
  { name: "STATUS", uid: "alarmStatus" },
  { name: "ACTIONS", uid: "actions" },
]

const INITIAL_VISIBLE_COLUMNS = [
  "incidentId",
  "severity",
  "assignedPerson",
  "incidentCreationTime",
  "alarmDescription",
  "department",
  "alarmStatus",
  "actions",
]

export function IncidentTable({ incidents: initialIncidents }: { incidents: Incident[] | any}) {
  const [filterValue, setFilterValue] = useState("")
  const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS))
  const [incidents] = useState<Incident[]>(initialIncidents)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "incidentCreationTime",
    direction: "descending",
  })
  const [page, setPage] = useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = useMemo(() => {
    let filteredIncidents = [...incidents]

    if (hasSearchFilter) {
      filteredIncidents = filteredIncidents.filter(
        (incident) =>
          incident.incidentId.toLowerCase().includes(filterValue.toLowerCase()) ||
          incident.alarmDescription.toLowerCase().includes(filterValue.toLowerCase()) ||
          incident.assignedPerson.toLowerCase().includes(filterValue.toLowerCase()) ||
          incident.department.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }

    return filteredIncidents
  }, [incidents, filterValue]) // Added filterValue to dependencies

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
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

  const renderCell = (incident: Incident, columnKey: React.Key) => {
    switch (columnKey) {
      case "severity":
        return (
          <Chip className="capitalize" color={severityColorMap[incident.severity]} size="sm" variant="flat">
            {incident.severity.toUpperCase()}
          </Chip>
        )
      case "assignedPerson":
        return (
          <User
            name={incident.assignedPerson}
            avatarProps={{
              src: `https://i.pravatar.cc/150?u=${incident.assignedPerson.replace(" ", "")}`,
            }}
          />
        )
      case "incidentCreationTime":
        return formatDate(incident.incidentCreationTime)
      case "alarmDescription":
        return (
          <Tooltip
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">Description</div>
                <div className="text-tiny">{incident.alarmDescription}</div>
                {incident.RCA && (
                  <>
                    <div className="text-small font-bold mt-2">RCA</div>
                    <div className="text-tiny">{incident.RCA}</div>
                  </>
                )}
                {incident.Note && (
                  <>
                    <div className="text-small font-bold mt-2">Note</div>
                    <div className="text-tiny">{incident.Note}</div>
                  </>
                )}
              </div>
            }
          >
            <span className="cursor-help truncate max-w-xs inline-block">{incident.alarmDescription}</span>
          </Tooltip>
        )
      case "alarmStatus":
        return (
          <Chip className="capitalize" color={statusColorMap[incident.alarmStatus]} size="sm" variant="dot">
            {incident.alarmStatus.toUpperCase()}
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
        return incident[columnKey as keyof Incident]
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
            placeholder="Search incidents..."
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
            <Button color="primary" startContent={<Plus className="h-4 w-4" />}>
              Create Incident
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
        <span className="text-small text-default-400">{filteredItems.length} incidents</span>
      </div>
    )
  }, [filteredItems.length, page, pages])

  return (
    <Table
      aria-label="Incident table"
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
      <TableBody items={items} emptyContent={"No incidents found"}>
        {(item) => (
          <TableRow key={item.incidentId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

