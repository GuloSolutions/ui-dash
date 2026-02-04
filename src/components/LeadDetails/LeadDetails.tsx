import { useState } from 'react';
import { format } from 'date-fns';
import { X, Copy, ExternalLink, Play, Pause, Flag, Calendar } from 'lucide-react';
import { Lead } from '../../types';
import { Button, StatusBadge } from '../UI';
import styles from './LeadDetails.module.css';

interface LeadDetailsProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'summary' | 'transcript' | 'activity' | 'crm';

export function LeadDetails({ lead, isOpen, onClose }: LeadDetailsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTime = '00:00';

  if (!isOpen || !lead) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(lead.contact);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.closeBtn} onClick={onClose}>
              <X size={20} />
            </button>
            <h2 className={styles.title}>Lead Details</h2>
            <button className={styles.copyLinkBtn} onClick={handleCopyLink}>
              <Copy size={14} />
              <span>Copy Link</span>
            </button>
            <button className={styles.flagBtn}>
              <Flag size={14} />
              <span>Flag</span>
            </button>
          </div>
        </div>

        {/* Lead Info Card */}
        <div className={styles.leadInfoCard}>
          <div className={styles.leadInfoHeader}>
            <div className={styles.leadInfoMain}>
              <h3 className={styles.leadName}>{lead.name}</h3>
              <div className={styles.leadPhoneRow}>
                <span className={styles.leadPhone}>{lead.contact}</span>
                <button className={styles.copyPhoneBtn} onClick={handleCopyPhone} title="Copy phone number">
                  <Copy size={12} />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.leadStatusRow}>
            <StatusBadge status={lead.status} />
            <span className={styles.statusDivider}>|</span>
            <span className={styles.callbackTag}>Callback Requested</span>
          </div>
          <div className={styles.leadMetaRow}>
            <Calendar size={14} className={styles.metaIcon} />
            <span className={styles.metaLabel}>First Touch:</span>
            <span className={styles.metaValue}>{format(lead.contactDate, 'MMM d, yyyy h:mm a')}</span>
          </div>
          <div className={styles.leadMetaRow}>
            <span className={styles.metaLabel}>Source:</span>
            <span className={styles.metaValue}>{lead.leadSource}</span>
            <span className={styles.metaDivider}>|</span>
            <span className={styles.metaLabel}>Business Unit:</span>
            <span className={styles.metaValue}>{lead.businessUnit || 'hvac'}</span>
            <span className={styles.metaDivider}>|</span>
            <span className={styles.metaLabel}>Duration:</span>
            <span className={styles.metaValue}>{lead.callDuration || '13:36'}</span>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'summary' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'transcript' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('transcript')}
          >
            Transcript
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'activity' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity Timeline
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'crm' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('crm')}
          >
            CRM Activity
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'summary' && (
            <div className={styles.summaryContent}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Lead Summary</span>
                <span className={styles.valueLong}>
                  {lead.leadSummary || `Qualified HVAC repair lead. ${lead.name} called seeking service for her UNICO high-velocity forced air system that intermittently turns on and off. She had previously contacted three technicians who were unable to diagnose the issue due to lacking UNICO diagnostic software. Although her North Mount Pleasant address (1450 Chandler Road, 29429) initially appeared outside the service area, the agent agreed to escalate her request to dispatch as a special exception given the urgent need and specific system requirements. The agent collected her contact information (${lead.contact}, rzsmith22@mail.com) and indicated dispatch would follow up regarding service availability. No specific appointment was scheduled - this remains a follow-up situation where dispatch will determine if they can service her specialized UNICO system.`}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Source Reference</span>
                <span className={styles.value}>
                  <a href="#" className={styles.link}>
                    Open in new tab <ExternalLink size={12} />
                  </a>
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>CSR Type</span>
                <span className={styles.value}>{lead.csrType || 'Live Agent'}</span>
              </div>
              <div className={styles.detailRowEmpty} />
              <div className={styles.detailRow}>
                <span className={styles.label}>Call Transcript URL</span>
                <span className={styles.value}>
                  <a href="#" className={styles.link}>Open transcript</a>
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Full Call Duration</span>
                <span className={styles.value}>{lead.callDuration || '13:36'}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Call Recording</span>
                <div className={styles.audioPlayer}>
                  <button
                    className={styles.playBtn}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <span className={styles.time}>{currentTime}</span>
                  <div className={styles.progressBar}>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: '0%' }} />
                      <div className={styles.progressHandle} style={{ left: '0%' }} />
                    </div>
                  </div>
                  <span className={styles.duration}>{lead.callDuration || '13:32'}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className={styles.transcriptContent}>
              <p className={styles.transcriptPlaceholder}>
                Transcript content would appear here...
              </p>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className={styles.transcriptContent}>
              <p className={styles.transcriptPlaceholder}>
                Activity timeline would appear here...
              </p>
            </div>
          )}

          {activeTab === 'crm' && (
            <div className={styles.transcriptContent}>
              <p className={styles.transcriptPlaceholder}>
                CRM activity would appear here...
              </p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary">
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
