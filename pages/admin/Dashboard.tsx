import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataService } from '../../services/data';
import { Inquiry, ServicePackage, Project, SiteContent, Testimonial, SiteSettings } from '../../types';
import { DEFAULT_SITE_CONTENT, DEFAULT_SETTINGS } from '../../constants';
import { Button } from '../../components/ui/Button';
import { LogOut, LayoutDashboard, Users, FileText, Settings, Search, Filter, Save, Plus, Trash2, Edit2, Image as ImageIcon, MessageSquare, Star, ExternalLink, X, Check, DollarSign, Upload, Menu, Calendar, Clock, Tag } from 'lucide-react';
import { auth } from '../../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// --- HELPER COMPONENTS (Moved outside to prevent re-render focus loss) ---

const InputGroup = ({ label, children, required, error }: { label: string, children?: React.ReactNode, required?: boolean, error?: string }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1 animate-fade-in">{error}</p>}
  </div>
);

const StyledInput = ({ hasError, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) => (
  <input 
    className={`w-full px-4 py-2.5 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 ${hasError ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'} ${className || ''}`}
    {...props}
  />
);

const StyledTextArea = ({ hasError, className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }) => (
  <textarea 
    className={`w-full px-4 py-2.5 bg-white border rounded-lg text-gray-900 focus:outline-none focus:ring-2 transition-all resize-none placeholder:text-gray-400 ${hasError ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-gray-300 focus:ring-primary/20 focus:border-primary'} ${className || ''}`}
    {...props}
  />
);

// --- MODAL COMPONENT ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 sticky top-0 z-10">
           <h3 className="font-serif text-lg font-bold text-dark">{title}</h3>
           <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 transition-colors"><X size={20} className="text-gray-500" /></button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col-reverse md:flex-row justify-end gap-3 sticky bottom-0 z-10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inquiries');
  
  // Data State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  
  // UI State
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({}); // Validation Errors
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Sidebar Toggle
  
  // Content Tab State
  const [contentSubTab, setContentSubTab] = useState<'home' | 'services' | 'about'>('home');

  // Modal State
  const [modalType, setModalType] = useState<'project' | 'package' | 'testimonial' | 'inquiry' | null>(null);
  const [newItemData, setNewItemData] = useState<any>({});
  
  const navigate = useNavigate();

  useEffect(() => {
    // Real Auth Check
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        // Only load data if authenticated
        Promise.all([
          DataService.getInquiries(),
          DataService.getPackages(),
          DataService.getProjects(),
          DataService.getTestimonials(),
          DataService.getSiteContent(),
          DataService.getSettings()
        ]).then(([inqData, pkgData, prjData, testiData, contentData, settingsData]) => {
          setInquiries(inqData);
          setPackages(pkgData);
          setProjects(prjData);
          setTestimonials(testiData);
          setSiteContent(contentData);
          setSettings(settingsData);
        }).catch(err => {
          console.error("Dashboard data load error:", err);
          alert("Error loading data. Check console for permissions details.");
        });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  // --- Helper Functions ---
  
  const formatDate = (isoString: string) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Convert File to Base64 String
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("File too large! Please upload an image smaller than 500KB for the free tier.");
        return;
      }
      try {
        const base64 = await convertToBase64(file);
        callback(base64);
      } catch (error) {
        console.error("Error converting file", error);
        alert("Failed to process image.");
      }
    }
  };

  // --- Content Management Handlers ---
  const handleContentChange = (
    section: keyof SiteContent | string, // Use string to support nested paths like 'servicesPage.header'
    field: string, 
    value: string
  ) => {
    const sectionParts = section.split('.');
    
    setSiteContent(prev => {
      // Deep Copy
      const newContent = JSON.parse(JSON.stringify(prev));
      
      let target = newContent;
      for (const part of sectionParts) {
        if (!target[part]) target[part] = {};
        target = target[part];
      }
      target[field] = value;
      return newContent;
    });
  };

  const handleSignatureChange = (index: number, field: string, value: string) => {
    const newStyles = [...siteContent.signatureStyles];
    newStyles[index] = { ...newStyles[index], [field]: value };
    setSiteContent(prev => ({ ...prev, signatureStyles: newStyles }));
  };

  const saveContent = async () => {
    setIsSaving(true);
    try {
      await DataService.updateSiteContent(siteContent);
    } catch (e) {
      alert("Failed to save content. Do you have admin permissions?");
    }
    setIsSaving(false);
  };

  // --- Settings Handlers ---
  const handleSettingsChange = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleBudgetRangeChange = (index: number, value: string) => {
    const newRanges = [...settings.budgetRanges];
    newRanges[index] = value;
    setSettings(prev => ({ ...prev, budgetRanges: newRanges }));
  };

  const addBudgetRange = () => {
    setSettings(prev => ({ ...prev, budgetRanges: [...prev.budgetRanges, ''] }));
  };

  const removeBudgetRange = (index: number) => {
    const newRanges = settings.budgetRanges.filter((_, i) => i !== index);
    setSettings(prev => ({ ...prev, budgetRanges: newRanges }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await DataService.updateSettings(settings);
    } catch (e) {
      alert("Failed to save settings. Check your connection or permissions.");
    }
    setIsSaving(false);
  };

  // --- Item Management Handlers (Add / Edit / Delete) ---
  const handleDelete = async (type: 'project' | 'package' | 'testimonial', id: string) => {
    if (!confirm('Are you sure you want to remove this item?')) return;
    
    try {
      if (type === 'project') {
        await DataService.deleteProject(id);
        setProjects(prev => prev.filter(p => p.id !== id));
      } else if (type === 'package') {
        await DataService.deletePackage(id);
        setPackages(prev => prev.filter(p => p.id !== id));
      } else if (type === 'testimonial') {
        await DataService.deleteTestimonial(id);
        setTestimonials(prev => prev.filter(t => t.id !== id));
      }
    } catch (e) {
      alert("Delete failed. Insufficient permissions.");
    }
  };

  const openModal = (type: 'project' | 'package' | 'testimonial' | 'inquiry') => {
    setModalType(type);
    setNewItemData({}); // Clear for new item
    setErrors({}); // Clear validation errors
  };

  const openEditModal = (type: 'project' | 'package' | 'testimonial', item: any) => {
    // Pre-process data for form (e.g. arrays to strings)
    let processedData = { ...item };
    
    if (type === 'project' && Array.isArray(item.themeTags)) {
      processedData.themeTags = item.themeTags.join(', ');
    }
    if (type === 'package' && Array.isArray(item.features)) {
      processedData.features = item.features.join('\n');
    }

    setNewItemData(processedData);
    setErrors({}); // Clear validation errors
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setNewItemData({});
    setErrors({});
  };

  const handleSaveItem = async () => {
    // Improved Inline Validation Logic
    const newErrors: Record<string, string> = {};
    
    if (modalType === 'project') {
       if (!newItemData.title?.trim()) newErrors.title = "Project Title is required.";
       if (!newItemData.coverImage?.trim()) newErrors.coverImage = "Cover Image is required.";
    } else if (modalType === 'package') {
       if (!newItemData.name?.trim()) newErrors.name = "Package Name is required.";
       if (!newItemData.priceFrom?.trim()) newErrors.priceFrom = "Starting Price is required.";
    } else if (modalType === 'testimonial') {
       if (!newItemData.name?.trim()) newErrors.name = "Client Name is required.";
       if (!newItemData.quote?.trim()) newErrors.quote = "Review Quote is required.";
    } else if (modalType === 'inquiry') {
       if (!newItemData.name?.trim()) newErrors.name = "Client Name is required.";
       if (!newItemData.email?.trim()) newErrors.email = "Email is required.";
       if (!newItemData.phone?.trim()) newErrors.phone = "Phone is required.";
       if (!newItemData.eventDate?.trim()) newErrors.eventDate = "Event Date is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If ID exists, we are editing. If not, we create new.
    const isEditing = !!newItemData.id;
    const id = isEditing ? newItemData.id : Date.now().toString();
    
    try {
      if (modalType === 'project') {
        const newItem: Project = {
          id,
          title: newItemData.title || 'New Project',
          slug: (newItemData.title || 'new').toLowerCase().replace(/\s+/g, '-'),
          coverImage: newItemData.coverImage || 'https://picsum.photos/800/600',
          location: newItemData.location || 'Jakarta',
          date: newItemData.date || new Date().getFullYear().toString(),
          themeTags: typeof newItemData.themeTags === 'string' 
            ? newItemData.themeTags.split(',').map((t: string) => t.trim()).filter(Boolean) 
            : newItemData.themeTags || ['Wedding'],
          description: newItemData.description || '',
          vendors: newItemData.vendors || [],
          isFeatured: newItemData.isFeatured || false
        };
        await DataService.saveProject(newItem);
        setProjects(prev => isEditing ? prev.map(p => p.id === id ? newItem : p) : [newItem, ...prev]);

      } else if (modalType === 'package') {
        const newItem: ServicePackage = {
          id,
          name: newItemData.name || 'New Package',
          priceFrom: newItemData.priceFrom || 'IDR 0',
          features: typeof newItemData.features === 'string'
            ? newItemData.features.split('\n').filter(Boolean)
            : newItemData.features || ['Feature 1'],
          isFeatured: newItemData.isFeatured || false,
          order: newItemData.order || packages.length + 1
        };
        await DataService.savePackage(newItem);
        setPackages(prev => isEditing ? prev.map(p => p.id === id ? newItem : p) : [...prev, newItem]);

      } else if (modalType === 'testimonial') {
        const newItem: Testimonial = {
          id,
          name: newItemData.name || 'Client Name',
          role: newItemData.role || 'Couple',
          rating: newItemData.rating || 5,
          quote: newItemData.quote || '',
          eventType: newItemData.eventType || 'Wedding'
        };
        await DataService.saveTestimonial(newItem);
        setTestimonials(prev => isEditing ? prev.map(t => t.id === id ? newItem : t) : [...prev, newItem]);

      } else if (modalType === 'inquiry') {
         // Handle Manual Inquiry Addition
         const inquiryData = {
            name: newItemData.name,
            email: newItemData.email,
            phone: newItemData.phone,
            eventDate: newItemData.eventDate,
            budgetRange: newItemData.budgetRange || 'Not specified',
            message: newItemData.message || 'Added via Admin Dashboard',
            serviceInterested: newItemData.serviceInterested ? [newItemData.serviceInterested] : []
         };
         
         await DataService.submitInquiry(inquiryData);
         
         // Refresh inquiries list
         const updatedInquiries = await DataService.getInquiries();
         setInquiries(updatedInquiries);
      }
      closeModal();
    } catch (e) {
      console.error(e);
      alert("Save failed. Insufficient permissions.");
    }
  };

  // --- Inquiry Status ---
  const handleStatusChange = async (id: string, newStatus: 'new' | 'contacted' | 'closed') => {
      // Optimistic update
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      try {
        await DataService.updateInquiryStatus(id, newStatus);
      } catch (e) {
        alert("Failed to update status.");
      }
  };

  const sortedInquiries = useMemo(() => {
    let items = [...inquiries];
    if (filterStatus !== 'all') items = items.filter(item => item.status === filterStatus);
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(lower) || i.email.toLowerCase().includes(lower));
    }
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [inquiries, filterStatus, searchQuery]);

  // Sidebar Item Component
  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button 
      onClick={() => {
        setActiveTab(id);
        setIsSidebarOpen(false); // Close sidebar on mobile when clicked
      }}
      className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 mb-1 ${
        activeTab === id 
          ? 'bg-primary text-white shadow-lg shadow-primary/30' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
      }`}
    >
      <Icon size={18} className="mr-3" /> {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans text-dark overflow-hidden">
      
      {/* Mobile Overlay (Backdrop) */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-black/50 z-30 md:hidden animate-fade-in"
        />
      )}

      {/* Sidebar - Responsive (Off-canvas on mobile, fixed on desktop) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-8 flex justify-between items-start">
            <div>
              <h1 className="font-serif text-2xl font-bold text-primary tracking-wide">Aster Admin</h1>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Control Panel</p>
            </div>
            {/* Close Button (Mobile Only) */}
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="md:hidden text-gray-400 hover:text-dark p-1"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-grow px-4 space-y-1 mt-2 overflow-y-auto">
            <SidebarItem id="inquiries" icon={Users} label="Inquiries" />
            <SidebarItem id="pages" icon={FileText} label="Pages Content" />
            <SidebarItem id="testimonials" icon={MessageSquare} label="Testimonials" />
            <SidebarItem id="portfolio" icon={ImageIcon} label="Portfolio" />
            <SidebarItem id="packages" icon={Check} label="Packages" />
            <SidebarItem id="settings" icon={Settings} label="Settings" />
          </nav>
          
          <div className="p-6 border-t border-gray-100 flex-shrink-0">
            <button onClick={handleLogout} className="flex items-center text-red-500 text-sm font-bold hover:text-red-700 transition-colors w-full px-4 py-2 hover:bg-red-50 rounded-lg">
              <LogOut size={16} className="mr-2" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Content Area - Responsive Margins */}
      <main className="flex-grow md:ml-72 w-full min-h-screen overflow-y-auto">
        <div className="p-4 md:p-10 max-w-[1600px] mx-auto">
          
          {/* Mobile Header (Hamburger) */}
          <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
             <div className="flex items-center gap-2">
               <div className="bg-primary rounded-lg p-2 text-white">
                 <span className="font-serif font-bold text-lg">A</span>
               </div>
               <span className="font-serif font-bold text-lg text-dark">Aster Admin</span>
             </div>
             <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-600">
               <Menu size={24} />
             </button>
          </div>

          {/* Desktop Header & Title */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark capitalize mb-2">{activeTab.replace('-', ' ')}</h2>
              <p className="text-gray-500 text-sm">Manage your platform content and data.</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
               <span className="text-sm font-bold text-gray-500">{auth.currentUser?.email}</span>
               <div className="bg-primary rounded-full h-10 w-10 flex items-center justify-center shadow-md text-white font-serif font-bold text-lg">A</div>
            </div>
          </div>

          {/* --- INQUIRIES TAB --- */}
          {activeTab === 'inquiries' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
                 <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                      <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <StyledInput 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ paddingLeft: '2.5rem' }}
                      />
                    </div>
                    <Button size="sm" onClick={() => openModal('inquiry')} className="whitespace-nowrap px-4"><Plus size={16} className="mr-1" /> Add Inquiry</Button>
                 </div>
                 
                 <div className="flex w-full md:w-auto items-center gap-3">
                   <Filter size={18} className="text-gray-400 hidden md:block" />
                   <select 
                     className="w-full md:w-auto border border-gray-300 rounded-lg text-sm px-4 py-2.5 outline-none focus:border-primary bg-white cursor-pointer hover:border-gray-400 transition-colors"
                     value={filterStatus}
                     onChange={(e) => setFilterStatus(e.target.value)}
                   >
                     <option value="all">All Status</option>
                     <option value="new">New</option>
                     <option value="contacted">Contacted</option>
                     <option value="closed">Closed</option>
                   </select>
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 min-w-[800px]">
                  <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-xs border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Client Info</th>
                      <th className="px-6 py-4">Event Details</th>
                      <th className="px-6 py-4">Status & Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sortedInquiries.map((inq, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 align-top w-1/3">
                          <div className="font-bold text-dark text-base">{inq.name}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-1"><span className="text-gray-400 w-12">Email:</span> {inq.email}</div>
                          <div className="flex items-center text-xs text-gray-500"><span className="text-gray-400 w-12">Phone:</span> {inq.phone}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-1"><span className="text-gray-400 w-12">Budget:</span> <span className="bg-gray-100 px-1.5 rounded font-mono">{inq.budgetRange}</span></div>
                        </td>
                        <td className="px-6 py-4 align-top w-1/3">
                          <div className="flex items-center gap-2 mb-2">
                             <Calendar size={14} className="text-primary" />
                             <span className="font-bold text-gray-700">{inq.eventDate}</span>
                          </div>
                          {inq.serviceInterested && inq.serviceInterested.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-1">
                              {inq.serviceInterested.map(s => <span key={s} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 flex items-center"><Tag size={10} className="mr-1"/> {s}</span>)}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded border border-gray-100 min-h-[40px]">
                            {inq.message || 'No additional message.'}
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <div className="flex flex-col gap-2">
                            <select 
                              className={`px-3 py-1.5 rounded-full text-xs font-bold border-none outline-none cursor-pointer shadow-sm transition-all w-fit ${
                                inq.status === 'new' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 
                                inq.status === 'contacted' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 
                                'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                            >
                              <option value="new">NEW</option>
                              <option value="contacted">CONTACTED</option>
                              <option value="closed">CLOSED</option>
                            </select>
                            
                            <div className="flex items-center text-[10px] text-gray-400 mt-1" title="Date Submitted">
                               <Clock size={10} className="mr-1" />
                               Submitted: {formatDate(inq.createdAt)}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- PAGES CONTENT TAB --- */}
          {activeTab === 'pages' && (
            <div className="space-y-6 md:space-y-8 animate-fade-in pb-20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-0 z-20 gap-3">
                 <div>
                    <h3 className="font-bold text-dark">Pages Content</h3>
                    <p className="text-xs text-gray-500">Edit texts and images for main pages.</p>
                 </div>
                 
                 <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                   {(['home', 'services', 'about'] as const).map(tab => (
                     <button
                       key={tab}
                       onClick={() => setContentSubTab(tab)}
                       className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition-all ${contentSubTab === tab ? 'bg-white shadow text-primary' : 'text-gray-500 hover:bg-gray-200'}`}
                     >
                       {tab}
                     </button>
                   ))}
                 </div>

                 <Button onClick={saveContent} disabled={isSaving} className="shadow-lg w-full md:w-auto" size="sm">
                   <Save size={16} className="mr-2" />
                   {isSaving ? 'Saving...' : 'Publish'}
                 </Button>
              </div>

              {/* HOME PAGE EDITOR */}
              {contentSubTab === 'home' && (
                <>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                    <h3 className="text-lg font-bold text-dark font-serif mb-6 border-b border-gray-100 pb-2">Hero Section</h3>
                    <div className="grid gap-6">
                      <InputGroup label="Headline">
                        <StyledTextArea rows={2} value={siteContent.hero.headline} onChange={(e) => handleContentChange('hero', 'headline', e.target.value)} />
                      </InputGroup>
                      <InputGroup label="Subheadline">
                        <StyledInput value={siteContent.hero.subheadline} onChange={(e) => handleContentChange('hero', 'subheadline', e.target.value)} />
                      </InputGroup>
                      <InputGroup label="CTA Button Text">
                        <StyledInput value={siteContent.hero.ctaText} onChange={(e) => handleContentChange('hero', 'ctaText', e.target.value)} />
                      </InputGroup>
                      <InputGroup label="Background Image">
                        <StyledInput value={siteContent.hero.backgroundImage} onChange={(e) => handleContentChange('hero', 'backgroundImage', e.target.value)} />
                        <div className="mt-2 h-32 w-full bg-gray-100 rounded overflow-hidden">
                           <img src={siteContent.hero.backgroundImage} className="w-full h-full object-cover" />
                        </div>
                      </InputGroup>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                    <h3 className="text-lg font-bold text-dark font-serif mb-6 border-b border-gray-100 pb-2">Signature Styles</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {siteContent.signatureStyles.map((style, idx) => (
                        <div key={style.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                          <span className="text-xs font-bold text-primary block mb-2">{style.iconName} Icon</span>
                          <InputGroup label="Title">
                            <StyledInput value={style.title} onChange={(e) => handleSignatureChange(idx, 'title', e.target.value)} />
                          </InputGroup>
                          <InputGroup label="Description">
                            <StyledTextArea rows={3} value={style.description} onChange={(e) => handleSignatureChange(idx, 'description', e.target.value)} />
                          </InputGroup>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                    <h3 className="text-lg font-bold text-dark font-serif mb-6 border-b border-gray-100 pb-2">CTA Section</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputGroup label="Title">
                         <StyledInput value={siteContent.ctaSection.title} onChange={(e) => handleContentChange('ctaSection', 'title', e.target.value)} />
                      </InputGroup>
                      <InputGroup label="Button Text">
                         <StyledInput value={siteContent.ctaSection.buttonText} onChange={(e) => handleContentChange('ctaSection', 'buttonText', e.target.value)} />
                      </InputGroup>
                      <div className="md:col-span-2">
                        <InputGroup label="Description">
                          <StyledTextArea rows={3} value={siteContent.ctaSection.description} onChange={(e) => handleContentChange('ctaSection', 'description', e.target.value)} />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* SERVICES PAGE EDITOR */}
              {contentSubTab === 'services' && (
                <>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                    <h3 className="text-lg font-bold text-dark font-serif mb-6 border-b border-gray-100 pb-2">Header</h3>
                    <InputGroup label="Title"><StyledInput value={siteContent.servicesPage?.header.title} onChange={(e) => handleContentChange('servicesPage.header', 'title', e.target.value)} /></InputGroup>
                    <InputGroup label="Subtitle"><StyledInput value={siteContent.servicesPage?.header.subtitle} onChange={(e) => handleContentChange('servicesPage.header', 'subtitle', e.target.value)} /></InputGroup>
                    <InputGroup label="Description"><StyledTextArea rows={3} value={siteContent.servicesPage?.header.description} onChange={(e) => handleContentChange('servicesPage.header', 'description', e.target.value)} /></InputGroup>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                    <h3 className="text-lg font-bold text-dark font-serif mb-6 border-b border-gray-100 pb-2">Section 1 (Full Planning)</h3>
                    <InputGroup label="Title"><StyledInput value={siteContent.servicesPage?.section1.title} onChange={(e) => handleContentChange('servicesPage.section1', 'title', e.target.value)} /></InputGroup>
                    <InputGroup label="Subtitle"><StyledInput value={siteContent.servicesPage?.section1.subtitle} onChange={(e) => handleContentChange('servicesPage.section1', 'subtitle', e.target.value)} /></InputGroup>
                    <InputGroup label="Description"><StyledTextArea rows={4} value={siteContent.servicesPage?.section1.description} onChange={(e) => handleContentChange('servicesPage.section1', 'description', e.target.value)} /></InputGroup>
                    <InputGroup label="Image URL"><StyledInput value={siteContent.servicesPage?.section1.image} onChange={(e) => handleContentChange('servicesPage.section1', 'image', e.target.value)} /></InputGroup>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                    <h3 className="text-lg font-bold text-dark font-serif mb-6 border-b border-gray-100 pb-2">Section 2 (Day-of)</h3>
                    <InputGroup label="Title"><StyledInput value={siteContent.servicesPage?.section2.title} onChange={(e) => handleContentChange('servicesPage.section2', 'title', e.target.value)} /></InputGroup>
                    <InputGroup label="Subtitle"><StyledInput value={siteContent.servicesPage?.section2.subtitle} onChange={(e) => handleContentChange('servicesPage.section2', 'subtitle', e.target.value)} /></InputGroup>
                    <InputGroup label="Description"><StyledTextArea rows={4} value={siteContent.servicesPage?.section2.description} onChange={(e) => handleContentChange('servicesPage.section2', 'description', e.target.value)} /></InputGroup>
                    <InputGroup label="Image URL"><StyledInput value={siteContent.servicesPage?.section2.image} onChange={(e) => handleContentChange('servicesPage.section2', 'image', e.target.value)} /></InputGroup>
                  </div>
                </>
              )}

              {/* ABOUT PAGE EDITOR */}
              {contentSubTab === 'about' && (
                <>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                    <h3 className="text-lg font-bold text-dark font-serif mb-6 border-b border-gray-100 pb-2">Header</h3>
                    <InputGroup label="Title"><StyledInput value={siteContent.aboutPage?.header.title} onChange={(e) => handleContentChange('aboutPage.header', 'title', e.target.value)} /></InputGroup>
                    <InputGroup label="Subtitle"><StyledInput value={siteContent.aboutPage?.header.subtitle} onChange={(e) => handleContentChange('aboutPage.header', 'subtitle', e.target.value)} /></InputGroup>
                    <InputGroup label="Description"><StyledTextArea rows={3} value={siteContent.aboutPage?.header.description} onChange={(e) => handleContentChange('aboutPage.header', 'description', e.target.value)} /></InputGroup>
                    <InputGroup label="Background Image"><StyledInput value={siteContent.aboutPage?.header.image} onChange={(e) => handleContentChange('aboutPage.header', 'image', e.target.value)} /></InputGroup>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                    <h3 className="text-lg font-bold text-dark font-serif mb-6 border-b border-gray-100 pb-2">Our Story</h3>
                    <InputGroup label="Title"><StyledInput value={siteContent.aboutPage?.story.title} onChange={(e) => handleContentChange('aboutPage.story', 'title', e.target.value)} /></InputGroup>
                    <InputGroup label="Description"><StyledTextArea rows={6} value={siteContent.aboutPage?.story.description} onChange={(e) => handleContentChange('aboutPage.story', 'description', e.target.value)} /></InputGroup>
                    <InputGroup label="Image URL"><StyledInput value={siteContent.aboutPage?.story.image} onChange={(e) => handleContentChange('aboutPage.story', 'image', e.target.value)} /></InputGroup>
                  </div>
                </>
              )}

            </div>
          )}

          {/* --- TESTIMONIALS TAB --- */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-fade-in">
               <div className="flex justify-between items-center">
                 <h3 className="text-lg font-bold text-dark font-serif">Client Reviews</h3>
                 <Button size="sm" onClick={() => openModal('testimonial')}><Plus size={16} className="mr-2" /> Add Review</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testi) => (
                  <div key={testi.id} className="bg-white border border-gray-200 rounded-xl p-6 relative hover:shadow-lg transition-all group">
                    <div className="absolute top-4 right-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button onClick={() => openEditModal('testimonial', testi)} className="p-2 bg-gray-50 text-blue-500 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm border border-gray-100"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete('testimonial', testi.id)} className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors shadow-sm border border-red-50"><Trash2 size={14} /></button>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-3">
                        {testi.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-dark">{testi.name}</h4>
                        <p className="text-xs text-gray-500">{testi.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic mb-4 leading-relaxed">"{testi.quote}"</p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < testi.rating ? "currentColor" : "none"} className={i < testi.rating ? "" : "text-gray-200"} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- PORTFOLIO TAB --- */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-fade-in">
               <div className="flex justify-between items-center">
                 <h3 className="text-lg font-bold text-dark font-serif">Portfolio Projects</h3>
                 <Button size="sm" onClick={() => openModal('project')}><Plus size={16} className="mr-2" /> Add Project</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-lg transition-all">
                    <div className="relative h-48 bg-gray-100">
                      <img src={project.coverImage} className="w-full h-full object-cover" alt={project.title} referrerPolicy="no-referrer" />
                      
                      {/* FEATURED BADGE */}
                      {project.isFeatured && (
                        <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10 uppercase tracking-wider">
                          Featured
                        </div>
                      )}
                      
                      <div className="absolute top-2 right-2 flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity z-10">
                         <button onClick={() => openEditModal('project', project)} className="p-2 bg-white rounded-full text-blue-500 hover:bg-blue-50 hover:text-blue-600 shadow-sm transition-colors"><Edit2 size={14} /></button>
                         <button onClick={() => handleDelete('project', project.id)} className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 shadow-sm transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-serif font-bold text-dark text-lg">{project.title}</h4>
                      <p className="text-xs text-primary font-bold mb-2 uppercase tracking-wide">{project.location} • {project.date}</p>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.themeTags.map(tag => <span key={tag} className="text-[10px] bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-gray-600">{tag}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- PACKAGES TAB --- */}
          {activeTab === 'packages' && (
             <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                 <h3 className="text-lg font-bold text-dark font-serif">Service Packages</h3>
                 <Button size="sm" onClick={() => openModal('package')}><Plus size={16} className="mr-2" /> Add Package</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-white border border-gray-200 rounded-xl p-6 relative hover:shadow-lg transition-all hover:border-primary/30">
                    {pkg.isFeatured && <span className="absolute top-4 right-4 text-[10px] font-bold bg-primary text-white px-2 py-1 rounded">FEATURED</span>}
                    <h4 className="font-serif font-bold text-xl text-dark mb-1">{pkg.name}</h4>
                    <p className="text-primary font-bold mb-4 text-2xl">{pkg.priceFrom}</p>
                    <ul className="text-sm text-gray-500 space-y-2 mb-6 border-t border-gray-100 pt-4">
                      {pkg.features.slice(0, 4).map((f, i) => <li key={i} className="flex items-start"><Check size={14} className="text-green-500 mr-2 mt-0.5" /> {f}</li>)}
                      {pkg.features.length > 4 && <li className="text-xs text-gray-400 pl-6">...and {pkg.features.length - 4} more</li>}
                    </ul>
                    <div className="flex justify-end pt-2 gap-3">
                      <button onClick={() => openEditModal('package', pkg)} className="text-blue-400 hover:text-blue-600 text-xs font-bold flex items-center"><Edit2 size={12} className="mr-1" /> Edit</button>
                      <button onClick={() => handleDelete('package', pkg.id)} className="text-red-400 hover:text-red-600 text-xs font-bold flex items-center"><Trash2 size={12} className="mr-1" /> Remove</button>
                    </div>
                  </div>
                ))}
              </div>
             </div>
          )}

          {/* --- SETTINGS TAB --- */}
          {activeTab === 'settings' && (
             <div className="space-y-6 md:space-y-8 animate-fade-in pb-20">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-0 z-20 gap-3">
                 <div>
                    <h3 className="font-bold text-dark">Global Settings</h3>
                    <p className="text-xs text-gray-500">Configure brand, contact, and budget options.</p>
                 </div>
                 <Button onClick={saveSettings} disabled={isSaving} className="shadow-lg w-full md:w-auto" size="sm">
                   <Save size={16} className="mr-2" />
                   {isSaving ? 'Saving...' : 'Update Settings'}
                 </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                  <h3 className="text-lg font-bold text-dark font-serif mb-6 border-b border-gray-100 pb-2">General Info</h3>
                  <InputGroup label="Brand Name">
                     <StyledInput value={settings.brandName} onChange={(e) => handleSettingsChange('brandName', e.target.value)} />
                  </InputGroup>
                  <InputGroup label="WhatsApp Number">
                     <StyledInput value={settings.whatsappNumber} onChange={(e) => handleSettingsChange('whatsappNumber', e.target.value)} placeholder="628..." />
                  </InputGroup>
                  <InputGroup label="Admin Email">
                     <StyledInput value={settings.adminEmail} onChange={(e) => handleSettingsChange('adminEmail', e.target.value)} />
                  </InputGroup>
                  <InputGroup label="Address">
                     <StyledTextArea rows={2} value={settings.address} onChange={(e) => handleSettingsChange('address', e.target.value)} />
                  </InputGroup>
                </div>

                {/* Budget Ranges */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8">
                  <h3 className="text-lg font-bold text-dark font-serif mb-6 border-b border-gray-100 pb-2 flex justify-between items-center">
                    <span>Budget Ranges (IDR)</span>
                    <button onClick={addBudgetRange} className="text-xs font-bold text-primary hover:text-primary-dark flex items-center"><Plus size={14} className="mr-1" /> Add Option</button>
                  </h3>
                  <div className="space-y-3">
                    {settings.budgetRanges.map((range, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <div className="bg-gray-50 px-3 py-2 text-gray-400 border border-gray-200 rounded-l-lg border-r-0 hidden md:block">
                          <DollarSign size={14} />
                        </div>
                        <input 
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg md:rounded-r-lg md:rounded-l-none text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          value={range}
                          onChange={(e) => handleBudgetRangeChange(idx, e.target.value)}
                          placeholder="e.g. IDR 100 Juta - 250 Juta"
                        />
                        <button onClick={() => removeBudgetRange(idx)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4 italic">
                    These options will appear in the dropdown menu on the Contact page.
                  </p>
                </div>
              </div>
             </div>
          )}
        </div>
      </main>

      {/* --- MODALS --- */}
      {/* Project Modal */}
      <Modal 
        isOpen={modalType === 'project'} 
        onClose={closeModal} 
        title={newItemData.id ? "Edit Project" : "Add New Project"}
        footer={<><Button variant="outline" onClick={closeModal} size="sm" fullWidth>Cancel</Button><Button onClick={handleSaveItem} size="sm" fullWidth>Save Project</Button></>}
      >
        <div className="space-y-4">
          <InputGroup label="Project Title" required error={errors.title}>
            <StyledInput hasError={!!errors.title} value={newItemData.title || ''} onChange={e => setNewItemData({...newItemData, title: e.target.value})} placeholder="e.g. Sarah & John Wedding" />
          </InputGroup>
          <div className="grid grid-cols-2 gap-4">
             <InputGroup label="Location">
               <StyledInput value={newItemData.location || ''} onChange={e => setNewItemData({...newItemData, location: e.target.value})} placeholder="e.g. Bali" />
             </InputGroup>
             <InputGroup label="Date (Year)">
               <StyledInput value={newItemData.date || ''} onChange={e => setNewItemData({...newItemData, date: e.target.value})} placeholder="e.g. 2024" />
             </InputGroup>
          </div>
          <InputGroup label="Cover Image" required error={errors.coverImage}>
             <div className="space-y-2">
                <StyledInput hasError={!!errors.coverImage} value={newItemData.coverImage || ''} onChange={e => setNewItemData({...newItemData, coverImage: e.target.value})} placeholder="https://..." />
                <p className="text-[10px] text-gray-400 -mt-2 italic">
                  Gunakan Direct Link (.jpg/.png) atau Upload gambar di bawah.
                </p>
                
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                     <input 
                       type="file" 
                       accept="image/*" 
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                       onChange={(e) => handleImageUpload(e, (base64) => setNewItemData({...newItemData, coverImage: base64}))}
                     />
                     <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-primary">
                       <span className="text-xs font-bold uppercase flex items-center"><Upload size={14} className="mr-1" /> {newItemData.coverImage ? "Change Image" : "Upload Image"}</span>
                     </div>
                </div>

                {/* IMAGE PREVIEW */}
                {newItemData.coverImage && (
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 mt-2 group shadow-sm">
                    <img 
                      src={newItemData.coverImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+Link')}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => setNewItemData({...newItemData, coverImage: ''})}
                          className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md hover:bg-red-600 transition-colors flex items-center"
                        >
                          <Trash2 size={12} className="mr-1" /> Remove Image
                        </button>
                    </div>
                  </div>
                )}
             </div>
          </InputGroup>
          <InputGroup label="Tags (comma separated)">
             <StyledInput value={newItemData.themeTags || ''} onChange={e => setNewItemData({...newItemData, themeTags: e.target.value})} placeholder="Outdoor, Rustic, Intimate" />
          </InputGroup>
          <InputGroup label="Short Description">
            <StyledTextArea rows={3} value={newItemData.description || ''} onChange={e => setNewItemData({...newItemData, description: e.target.value})} />
          </InputGroup>
          
          <div className="flex items-center gap-2">
             <input type="checkbox" id="projectFeatured" checked={newItemData.isFeatured || false} onChange={e => setNewItemData({...newItemData, isFeatured: e.target.checked})} className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
             <label htmlFor="projectFeatured" className="text-sm font-semibold text-gray-700 select-none cursor-pointer">Set as Featured Project</label>
          </div>
        </div>
      </Modal>

      {/* Package Modal */}
      <Modal 
        isOpen={modalType === 'package'} 
        onClose={closeModal} 
        title={newItemData.id ? "Edit Service Package" : "Add Service Package"}
        footer={<><Button variant="outline" onClick={closeModal} size="sm" fullWidth>Cancel</Button><Button onClick={handleSaveItem} size="sm" fullWidth>Save Package</Button></>}
      >
         <div className="space-y-4">
          <InputGroup label="Package Name" required error={errors.name}>
            <StyledInput hasError={!!errors.name} value={newItemData.name || ''} onChange={e => setNewItemData({...newItemData, name: e.target.value})} placeholder="e.g. Full Planning" />
          </InputGroup>
          <InputGroup label="Starting Price" required error={errors.priceFrom}>
            <StyledInput hasError={!!errors.priceFrom} value={newItemData.priceFrom || ''} onChange={e => setNewItemData({...newItemData, priceFrom: e.target.value})} placeholder="e.g. IDR 50.000.000" />
          </InputGroup>
          <InputGroup label="Features (One per line)">
            <StyledTextArea rows={6} value={newItemData.features || ''} onChange={e => setNewItemData({...newItemData, features: e.target.value})} placeholder="Venue Scouting&#10;Budget Management&#10;Day-of Coordinator" />
          </InputGroup>
           <div className="flex items-center gap-2">
             <input type="checkbox" id="featured" checked={newItemData.isFeatured || false} onChange={e => setNewItemData({...newItemData, isFeatured: e.target.checked})} className="rounded text-primary focus:ring-primary" />
             <label htmlFor="featured" className="text-sm font-semibold text-gray-700">Set as Featured Package</label>
           </div>
        </div>
      </Modal>

      {/* Testimonial Modal */}
      <Modal 
        isOpen={modalType === 'testimonial'} 
        onClose={closeModal} 
        title={newItemData.id ? "Edit Testimonial" : "Add Testimonial"}
        footer={<><Button variant="outline" onClick={closeModal} size="sm" fullWidth>Cancel</Button><Button onClick={handleSaveItem} size="sm" fullWidth>Save Review</Button></>}
      >
         <div className="space-y-4">
          <InputGroup label="Client Name" required error={errors.name}>
            <StyledInput hasError={!!errors.name} value={newItemData.name || ''} onChange={e => setNewItemData({...newItemData, name: e.target.value})} />
          </InputGroup>
          <InputGroup label="Role">
            <StyledInput value={newItemData.role || ''} onChange={e => setNewItemData({...newItemData, role: e.target.value})} placeholder="Bride / Groom / Parent" />
          </InputGroup>
          <InputGroup label="Review Quote" required error={errors.quote}>
            <StyledTextArea hasError={!!errors.quote} rows={4} value={newItemData.quote || ''} onChange={e => setNewItemData({...newItemData, quote: e.target.value})} />
          </InputGroup>
        </div>
      </Modal>
      
      {/* ADDED: Inquiry Modal (Manual Add) */}
      <Modal 
        isOpen={modalType === 'inquiry'} 
        onClose={closeModal} 
        title="Add New Inquiry (Manual)"
        footer={<><Button variant="outline" onClick={closeModal} size="sm" fullWidth>Cancel</Button><Button onClick={handleSaveItem} size="sm" fullWidth>Add Inquiry</Button></>}
      >
        <div className="space-y-4">
          <InputGroup label="Client Name" required error={errors.name}>
            <StyledInput hasError={!!errors.name} value={newItemData.name || ''} onChange={e => setNewItemData({...newItemData, name: e.target.value})} placeholder="Full Name" />
          </InputGroup>
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Email" required error={errors.email}>
              <StyledInput hasError={!!errors.email} type="email" value={newItemData.email || ''} onChange={e => setNewItemData({...newItemData, email: e.target.value})} placeholder="client@email.com" />
            </InputGroup>
            <InputGroup label="Phone" required error={errors.phone}>
              <StyledInput hasError={!!errors.phone} value={newItemData.phone || ''} onChange={e => setNewItemData({...newItemData, phone: e.target.value})} placeholder="08..." />
            </InputGroup>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Event Date" required error={errors.eventDate}>
               <StyledInput type="date" hasError={!!errors.eventDate} value={newItemData.eventDate || ''} onChange={e => setNewItemData({...newItemData, eventDate: e.target.value})} />
            </InputGroup>
            <InputGroup label="Service Interested">
               <select 
                 className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                 value={newItemData.serviceInterested || ''}
                 onChange={e => setNewItemData({...newItemData, serviceInterested: e.target.value})}
               >
                 <option value="">Select Package...</option>
                 {packages.map((pkg) => (
                   <option key={pkg.id} value={pkg.name}>{pkg.name} ({pkg.priceFrom})</option>
                 ))}
                 <option value="Custom">Custom / Other</option>
               </select>
            </InputGroup>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <InputGroup label="Budget Range">
               <select 
                 className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                 value={newItemData.budgetRange || ''}
                 onChange={e => setNewItemData({...newItemData, budgetRange: e.target.value})}
               >
                 <option value="">Select Range</option>
                 {settings.budgetRanges.map((range, idx) => (
                   <option key={idx} value={range}>{range}</option>
                 ))}
               </select>
            </InputGroup>
          </div>
          <InputGroup label="Notes / Message">
            <StyledTextArea rows={3} value={newItemData.message || ''} onChange={e => setNewItemData({...newItemData, message: e.target.value})} placeholder="Details about the wedding..." />
          </InputGroup>
        </div>
      </Modal>

    </div>
  );
};