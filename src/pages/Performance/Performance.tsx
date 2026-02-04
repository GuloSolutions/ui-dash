import { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown, BarChart3, TrendingUp, Copy } from 'lucide-react';
import { Header } from '../../components/Layout';
import { MetricCard, StatusBadge, SearchInput, Pagination, Button } from '../../components/UI';
import { FilterSidebar } from '../../components/Filters';
import { ObjectionsChart, TopObjections, ObjectionFilter } from '../../components/Charts';
import { notBookedLeads, performanceMetrics, objectionsOverTime, topObjections, businessUnits } from '../../data/mockData';
import { Lead, LeadSource, LeadStatus } from '../../types';
import styles from './Performance.module.css';

const LEAD_SOURCES: LeadSource[] = ['Google PPC', 'Google LSA', 'Yelp', 'Organic'];
const LEAD_STATUSES: LeadStatus[] = ['Follow-Up', 'Missed', 'Not Booked', 'Unqualified', 'New Lead', 'Lost', 'Booked', 'Cancellation'];

interface PerformanceProps {
  onLeadClick: (lead: Lead) => void;
}

export function Performance({ onLeadClick }: PerformanceProps) {
  const [viewMode, setViewMode] = useState<'line' | 'bar'>('line');
  const timeRange = 'By Week';
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [statusFilters, setStatusFilters] = useState<Set<LeadStatus>>(new Set(['Not Booked']));
  const [sourceFilters, setSourceFilters] = useState<Set<LeadSource>>(new Set());
  const [businessUnitFilters, setBusinessUnitFilters] = useState<Set<string>>(new Set());
  const [objectionFilters, setObjectionFilters] = useState<Set<string>>(new Set());

  const toggleFilter = <T extends string>(set: Set<T>, value: T, setter: React.Dispatch<React.SetStateAction<Set<T>>>) => {
    const newSet = new Set(set);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setter(newSet);
  };

  const toggleObjectionFilter = (name: string) => {
    toggleFilter(objectionFilters, name, setObjectionFilters);
  };

  const filteredLeads = notBookedLeads.filter((lead) => {
    if (searchQuery && !lead.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !lead.contact.includes(searchQuery)) {
      return false;
    }
    if (statusFilters.size > 0 && !statusFilters.has(lead.status)) return false;
    if (sourceFilters.size > 0 && !sourceFilters.has(lead.leadSource)) return false;
    if (businessUnitFilters.size > 0 && lead.businessUnit && !businessUnitFilters.has(lead.businessUnit)) return false;
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
      emptyText: 'No filters selected — showing all lead sources',
    },
    {
      title: 'Business Unit',
      items: businessUnits.map(unit => ({
        label: unit,
        value: unit,
        checked: businessUnitFilters.has(unit),
      })),
      onToggle: (value: string) => toggleFilter(businessUnitFilters, value, setBusinessUnitFilters),
      onClear: () => setBusinessUnitFilters(new Set()),
      emptyText: 'No filters selected — showing all business units',
    },
  ];

  // Get table title based on selected statuses
  const getTableTitle = () => {
    if (statusFilters.size === 1) {
      return `${Array.from(statusFilters)[0]} Leads`;
    }
    if (statusFilters.size > 1) {
      return 'Filtered Leads';
    }
    return 'All Leads';
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.content}>
        <div className={styles.mainContent}>
          {/* Metrics Grid */}
          <div className={styles.metricsGrid}>
            <MetricCard label="Total Not Booked" value={performanceMetrics.totalNotBooked.value} change={performanceMetrics.totalNotBooked.change} />
            <MetricCard label="Success Rate" value={performanceMetrics.successRate.value} change={performanceMetrics.successRate.change} />
            <MetricCard label="Avg Daily Not Booked" value={performanceMetrics.avgDailyNotBooked.value} change={performanceMetrics.avgDailyNotBooked.change} />
            <MetricCard label="Total Phone Calls" value={performanceMetrics.totalPhoneCalls.value} change={performanceMetrics.totalPhoneCalls.change} />
          </div>

          {/* Chart Section */}
          <div className={styles.chartSection}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleRow}>
                <h3 className={styles.chartTitle}>Objections Over Time</h3>
                <ObjectionFilter
                  items={topObjections}
                  selectedObjections={objectionFilters}
                  onToggle={toggleObjectionFilter}
                />
              </div>
              <div className={styles.chartControls}>
                <div className={styles.viewToggle}>
                  <button
                    className={`${styles.viewBtn} ${viewMode === 'line' ? styles.active : ''}`}
                    onClick={() => setViewMode('line')}
                  >
                    <TrendingUp size={16} />
                  </button>
                  <button
                    className={`${styles.viewBtn} ${viewMode === 'bar' ? styles.active : ''}`}
                    onClick={() => setViewMode('bar')}
                  >
                    <BarChart3 size={16} />
                  </button>
                </div>
                <button className={styles.timeRangeBtn}>
                  {timeRange}
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            <div className={styles.chartContent}>
              <div className={styles.chartArea}>
                <ObjectionsChart
                  data={objectionsOverTime}
                  legendItems={topObjections}
                  selectedObjections={objectionFilters}
                />
              </div>
              <div className={styles.topObjections}>
                <TopObjections data={topObjections} />
              </div>
            </div>
          </div>

          {/* Leads Table */}
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <h2 className={styles.tableTitle}>{getTableTitle()}</h2>
              <div className={styles.tableActions}>
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by name, phone"
                />
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Objection</th>
                    <th>Business Unit</th>
                    <th>Contact</th>
                    <th>Date &amp; Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLeads.map((lead) => (
                    <tr key={lead.id} onClick={() => onLeadClick(lead)}>
                      <td className={styles.nameCell}>{lead.name}</td>
                      <td><StatusBadge status={lead.status} /></td>
                      <td>{lead.objection}</td>
                      <td>{lead.businessUnit}</td>
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
                      <td>{format(lead.contactDate, 'MMM d, h:mm a')}</td>
                      <td className={styles.actionsCell}>
                        <Button variant="ghost" size="small" onClick={() => {}}>
                          View
                        </Button>
                        <Button variant="ghost" size="small" onClick={() => {}}>
                          Edit
                        </Button>
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
