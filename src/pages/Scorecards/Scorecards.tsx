import { useState } from 'react';
import { format } from 'date-fns';
import { Download, Plus, Pencil, Copy } from 'lucide-react';
import { Header } from '../../components/Layout';
import { MetricCard, StatusBadge, SearchInput, Pagination } from '../../components/UI';
import { FilterSidebar } from '../../components/Filters';
import { BookedLostChart } from '../../components/Charts';
import { mqlLeads, scorecardsMetrics } from '../../data/mockData';
import { Lead, LeadStatus, LeadSource, LeadType, CSRType } from '../../types';
import styles from './Scorecards.module.css';

const LEAD_STATUSES: LeadStatus[] = ['Follow-Up', 'Missed', 'Not Booked', 'Unqualified', 'New Lead', 'Lost', 'Booked', 'Cancellation'];
const LEAD_SOURCES: LeadSource[] = ['Google PPC', 'Google LSA', 'Yelp', 'Organic'];
const LEAD_TYPES: LeadType[] = ['Message', 'Form', 'Call', 'Chat'];
const CSR_TYPES: CSRType[] = ['AI Agent', 'Automated System', 'Live Agent'];

interface ScorecardsProps {
  onLeadClick: (lead: Lead) => void;
}

export function Scorecards({ onLeadClick }: ScorecardsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [statusFilters, setStatusFilters] = useState<Set<LeadStatus>>(new Set());
  const [sourceFilters, setSourceFilters] = useState<Set<LeadSource>>(new Set());
  const [typeFilters, setTypeFilters] = useState<Set<LeadType>>(new Set());
  const [csrFilters, setCsrFilters] = useState<Set<CSRType>>(new Set());

  const toggleFilter = <T extends string>(set: Set<T>, value: T, setter: React.Dispatch<React.SetStateAction<Set<T>>>) => {
    const newSet = new Set(set);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setter(newSet);
  };

  const filteredLeads = mqlLeads.filter((lead) => {
    if (searchQuery && !lead.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !lead.contact.includes(searchQuery)) {
      return false;
    }
    if (statusFilters.size > 0 && !statusFilters.has(lead.status)) return false;
    if (sourceFilters.size > 0 && !sourceFilters.has(lead.leadSource)) return false;
    if (typeFilters.size > 0 && !typeFilters.has(lead.type)) return false;
    if (csrFilters.size > 0 && lead.csrType && !csrFilters.has(lead.csrType)) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filterGroups = [
    {
      title: 'Lead Status',
      items: LEAD_STATUSES.map(status => ({
        label: status,
        value: status,
        checked: statusFilters.has(status),
      })),
      onToggle: (value: string) => toggleFilter(statusFilters, value as LeadStatus, setStatusFilters),
      onClear: () => setStatusFilters(new Set()),
    },
    {
      title: 'Lead Sources',
      items: LEAD_SOURCES.map(source => ({
        label: source,
        value: source,
        checked: sourceFilters.has(source),
      })),
      onToggle: (value: string) => toggleFilter(sourceFilters, value as LeadSource, setSourceFilters),
      onClear: () => setSourceFilters(new Set()),
    },
    {
      title: 'Lead Type',
      items: LEAD_TYPES.map(type => ({
        label: type,
        value: type,
        checked: typeFilters.has(type),
      })),
      onToggle: (value: string) => toggleFilter(typeFilters, value as LeadType, setTypeFilters),
      onClear: () => setTypeFilters(new Set()),
    },
    {
      title: 'CSR Type',
      items: CSR_TYPES.map(csr => ({
        label: csr,
        value: csr,
        checked: csrFilters.has(csr),
      })),
      onToggle: (value: string) => toggleFilter(csrFilters, value as CSRType, setCsrFilters),
      onClear: () => setCsrFilters(new Set()),
    },
  ];

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.content}>
        <div className={styles.mainContent}>
          {/* First Row - 5 cards */}
          <div className={styles.metricsGridFive}>
            <MetricCard label="Total Ad Spend" value={scorecardsMetrics.totalAdSpend.value} change={scorecardsMetrics.totalAdSpend.change} />
            <MetricCard label="Revenue Booked" value={scorecardsMetrics.revenueBooked.value} change={scorecardsMetrics.revenueBooked.change} />
            <MetricCard label="ROAS" value={scorecardsMetrics.roas.value} change={scorecardsMetrics.roas.change} />
            <MetricCard label="Booking Rate" value={scorecardsMetrics.bookingRate.value} change={scorecardsMetrics.bookingRate.change} />
            <MetricCard label="Booked Jobs" value={scorecardsMetrics.bookedJobs.value} change={scorecardsMetrics.bookedJobs.change} />
          </div>

          {/* Second Row - 5 cards */}
          <div className={styles.metricsGridFive}>
            <MetricCard label="CPQL" value={scorecardsMetrics.cpql.value} change={scorecardsMetrics.cpql.change} />
            <MetricCard label="CPBL" value={scorecardsMetrics.cpbl.value} change={scorecardsMetrics.cpbl.change} />
            <MetricCard label="Ave. Ticket" value={scorecardsMetrics.avgTicket.value} change={scorecardsMetrics.avgTicket.change} />
            <MetricCard label="Revenue Missed" value={scorecardsMetrics.revenueMissed.value} change={scorecardsMetrics.revenueMissed.change} />
            <MetricCard label="Total Qualified Leads" value={scorecardsMetrics.totalQualifiedLeads.value} change={scorecardsMetrics.totalQualifiedLeads.change} />
          </div>

          {/* Chart */}
          <BookedLostChart />

          {/* MQL Leads Table */}
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <h2 className={styles.tableTitle}>MQL Leads</h2>
              <div className={styles.tableActions}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by name, email..."
                />
                <button className={styles.iconBtn}>
                  <Download size={18} />
                </button>
                <button className={styles.iconBtn}>
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Lead Sources</th>
                    <th>Type</th>
                    <th>Contact</th>
                    <th>Job Value</th>
                    <th>Contact Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeads.map((lead) => (
                    <tr key={lead.id} onClick={() => onLeadClick(lead)}>
                      <td className={styles.nameCell}>{lead.name}</td>
                      <td><StatusBadge status={lead.status} /></td>
                      <td>{lead.leadSource}</td>
                      <td>{lead.type}</td>
                      <td className={styles.contactCell}>
                        <span>{lead.contact}</span>
                        <button
                          className={styles.copyBtn}
                          onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(lead.contact); }}
                          title="Copy phone number"
                        >
                          <Copy size={12} />
                        </button>
                      </td>
                      <td>${lead.jobValue}</td>
                      <td>{format(lead.contactDate, 'MMM d yyyy, h:mm a')}</td>
                      <td>
                        <button className={styles.editBtn} onClick={(e) => { e.stopPropagation(); }}>
                          <Pencil size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredLeads.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </div>

        <FilterSidebar groups={filterGroups} />
      </div>
    </div>
  );
}
