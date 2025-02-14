"use client";

import { useState, useMemo } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { Plus, Search, FileDown, FileUp, Edit, Eye, History } from "lucide-react";
import type { Incident } from "@/types/incident";

const severityColorMap: Record<string, ChipProps["color"]> = {
  p1: "danger",
  p2: "warning",
  p3: "primary",
};

const statusColorMap: Record<string, ChipProps["color"]> = {
  open: "warning",
  closed: "success",
};

const columns = [
  { name: "INCIDENT ID", uid: "incidentId" },
  { name: "SEVERITY", uid: "severity" },
  { name: "ASSIGNED TO", uid: "assignedPerson" },
  { name: "CREATED", uid: "incidentCreationTime" },
  { name: "DESCRIPTION", uid: "alarmDescription" },
  { name: "DEPARTMENT", uid: "department" },
  { name: "STATUS", uid: "alarmStatus" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "incidentId",
  "severity",
  "assignedPerson",
  "incidentCreationTime",
  "alarmDescription",
  "department",
  "alarmStatus",
  "actions",
];

export function IncidentTable({ incidents, loading, error }: { incidents: Incident[], loading: boolean, error: string | null }) {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "incidentCreationTime",
    direction: "descending",
  });
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    severity: "p1",
    assignedPerson: "",
    alarmDescription: "",
    department: "",
    alarmStatus: "open",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredIncidents = incidents && [...incidents];

    if (hasSearchFilter) {
      filteredIncidents = filteredIncidents.filter(
        (incident) =>
          incident.incidentId.toLowerCase().includes(filterValue.toLowerCase()) ||
          incident.alarmDescription.toLowerCase().includes(filterValue.toLowerCase()) ||
          incident.assignedPerson.toLowerCase().includes(filterValue.toLowerCase()) ||
          incident.department.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredIncidents;
  }, [incidents, filterValue]);

  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderCell = (incident: Incident, columnKey: React.Key) => {
    switch (columnKey) {
      case "severity":
        return (
          <Chip className="capitalize" color={severityColorMap[incident.severity]} size="sm" variant="flat">
            {incident.severity.toUpperCase()}
          </Chip>
        );
      case "assignedPerson":
        return (
          <User
            name={incident.assignedPerson}
            avatarProps={{
              src: `https://i.pravatar.cc/150?u=${incident.assignedPerson.replace(" ", "")}`,
            }}
          />
        );
      case "incidentCreationTime":
        return formatDate(incident.incidentCreationTime);
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
        );
      case "alarmStatus":
        return (
          <Chip className="capitalize" color={statusColorMap[incident.alarmStatus]} size="sm" variant="dot">
            {incident.alarmStatus.toUpperCase()}
          </Chip>
        );
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
        );
      default:
        return incident[columnKey as keyof Incident];
    }
  };

  const onSearchChange = (value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  };

  const handleFormSubmit = () => {
    // Handle form submission logic here
    console.log("Form Data:", formData);
    setIsModalOpen(false); // Close the modal after submission
  };

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
            <Button
              color="success"
              startContent={<Plus className="h-4 w-4 text-white" />}
              className="text-white"
              onPress={() => setIsModalOpen(true)}
            >
              Create Incident
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterValue]);

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
        <span className="text-small text-default-400">{filteredItems?.length} incidents</span>
      </div>
    );
  }, [filteredItems?.length, page, pages]);

  if (error) {
    return <div className="text-danger flex justify-center items-center font-extrabold text-3xl pt-28">Error: {error}</div>;
  }

  return (
    <>
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
        <TableBody
          items={items}
          emptyContent={
            loading ? (
              <div className="flex justify-center items-center h-32">
                <Spinner label="Loading..." color="success" />
              </div>
            ) : (
              "No incidents found"
            )
          }
        >
          {(item) => (
            <TableRow key={item.incidentId}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Modal for Creating/Editing Incidents */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Create Incident</ModalHeader>
          <ModalBody>
            <Select
              label="Severity"
              placeholder="Select severity"
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
            >
              <SelectItem key="p1" value="p1">
                P1
              </SelectItem>
              <SelectItem key="p2" value="p2">
                P2
              </SelectItem>
              <SelectItem key="p3" value="p3">
                P3
              </SelectItem>
            </Select>
            <Input
              label="Assigned Person"
              placeholder="Enter assigned person"
              value={formData.assignedPerson}
              onChange={(e) => setFormData({ ...formData, assignedPerson: e.target.value })}
            />
            <Textarea
              label="Description"
              placeholder="Enter alarm description"
              value={formData.alarmDescription}
              onChange={(e) => setFormData({ ...formData, alarmDescription: e.target.value })}
            />
            <Input
              label="Department"
              placeholder="Enter department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
            <Select
              label="Status"
              placeholder="Select status"
              value={formData.alarmStatus}
              onChange={(e) => setFormData({ ...formData, alarmStatus: e.target.value })}
            >
              <SelectItem key="open" value="open">
                Open
              </SelectItem>
              <SelectItem key="closed" value="closed">
                Closed
              </SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button color="success" onPress={handleFormSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}