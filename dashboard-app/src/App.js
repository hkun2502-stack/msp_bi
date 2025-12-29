import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, Award, BookOpen, FileCheck, Calendar, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPrototype = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const MetricCard = ({ title, value, change, trend, icon: Icon, subtitle }) => (
    <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow h-full">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
          {change && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {change}
              </span>
              <span className="text-gray-400 text-sm ml-1">环比上期</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );

  const FilterPanel = ({ filters, values = {}, onChange = () => {}, onReset = () => {}, onApply = () => {}, showApply = false }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-800">筛选条件</h3>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onReset} className="text-blue-600 text-sm hover:text-blue-700">重置</button>
          {showApply && (
            <button onClick={onApply} className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">应用</button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filters.map((filter, idx) => (
          <div key={filter.key ?? idx}>
            <label className="block text-sm text-gray-600 mb-1">{filter.label}</label>
            {/* date range */}
            {filter.type === 'dateRange' ? (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={values[filter.key]?.start || ''}
                  onChange={(e) => onChange(filter.key, { ...(values[filter.key] || {}), start: e.target.value })}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  value={values[filter.key]?.end || ''}
                  onChange={(e) => onChange(filter.key, { ...(values[filter.key] || {}), end: e.target.value })}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : filter.type === 'select' && filter.options ? (
              <select
                value={values[filter.key] ?? filter.default}
                onChange={(e) => onChange(filter.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {filter.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <select
                value={values[filter.key] ?? filter.default}
                onChange={(e) => onChange(filter.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>{filter.default}</option>
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const LifecycleTable = () => {
    // 示例数据：生命周期全表（字段按要求）
    const lifecycleTableData = [
      {
        id: 1,
        uin: 'U001', certName: '云计算架构师', startTime: '2025-04-01', lastLearnTime: '2025-11-28 10:12',
        videoDurationMin: 120, totalLearnMinutes: 145, totalLessons: 20, learnedLessons: 18, isCompleted: '是',
        examUin: 'EXU001', userSource: '官网直接访问', name: '张三', weworkId: 'gw123', examType: '线上', examLang: '中文', examDuration: 120, ExamCode: 'EC123',
        registerTime: '2025-04-05', examTime: '2025-05-01 09:00', venueName: '北京考点A', examMethod: '闭卷', examCode: 'E1234', qualificationCode: 'Q001',
        examStatus: '考试通过', score: 85, activityId: 'A001', importReason: '导入', notes: '', systemId: 'SYS001', settlementPath: '在线', purchaseMethod: '直接购买',
        userSource1: '官网', userSource2: 'campaign', userSource3: '渠道A', usedFreeVoucher: '否', certStatus: '已持证', certNumber: 'C-20250415-001', certExpiry: '2027-04-15', certGrantTime: '2025-04-15'
      },
      {
        id: 2,
        uin: 'U002', certName: '数据分析师', startTime: '2025-04-03', lastLearnTime: '2025-10-20 09:00',
        videoDurationMin: 95, totalLearnMinutes: 89, totalLessons: 18, learnedLessons: 16, isCompleted: '否',
        examUin: 'EXU002', userSource: '微信公众号', name: '李四', weworkId: 'gw456', examType: '线下', examLang: '中文', examDuration: 150, ExamCode: 'EC456',
        registerTime: '2025-04-08', examTime: '2025-06-12 13:30', venueName: '上海考点B', examMethod: '机考', examCode: 'E5678', qualificationCode: 'Q002',
        examStatus: '未参考', score: '-', activityId: 'A002', importReason: '手工', notes: '备注示例', systemId: 'SYS002', settlementPath: '线下结算', purchaseMethod: '团购',
        userSource1: '公众号', userSource2: '推文', userSource3: '活动', usedFreeVoucher: '是', certStatus: '未持证', certNumber: '', certExpiry: '', certGrantTime: ''
      }
    ];

    // filter state
    const [tableFilters, setTableFilters] = useState({
      certName: '全部',
      lastLearnTime: { start: '', end: '' },
      registerTime: { start: '', end: '' },
      examTime: { start: '', end: '' },
      activityId: '',
      userSource1: '全部'
    });

    const certOptions = ['全部', ...Array.from(new Set(lifecycleTableData.map(i => i.certName)))]
    const userSourceOptions = ['全部', '内部员工', '生态员工', '外部客户'];

    const handleFilterChange = (key, value) => {
      setTableFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleReset = () => {
      setTableFilters({ certName: '全部', lastLearnTime: { start: '', end: '' }, registerTime: { start: '', end: '' }, examTime: { start: '', end: '' }, activityId: '', userSource1: '全部' });
      setCurrentPage(1);
    };

    const handleApply = () => {
      setCurrentPage(1);
    };

    const parseDate = (s) => {
      if (!s) return null;
      // accept formats like '2025-11-28 10:12' or '2025-11-28'
      const d = new Date(s.length === 10 ? s + 'T00:00:00' : s.replace(' ', 'T'));
      if (isNaN(d.getTime())) return null;
      return d;
    };

    const inRange = (itemDateStr, range) => {
      if (!range) return true;
      const { start, end } = range;
      if (!start && !end) return true;
      const d = parseDate(itemDateStr);
      if (!d) return false;
      if (start) {
        const s = new Date(start + 'T00:00:00');
        if (d < s) return false;
      }
      if (end) {
        const e = new Date(end + 'T23:59:59');
        if (d > e) return false;
      }
      return true;
    };

    const matchesFilters = (item) => {
      if (tableFilters.certName && tableFilters.certName !== '全部' && item.certName !== tableFilters.certName) return false;
      if (tableFilters.activityId && tableFilters.activityId !== '全部' && tableFilters.activityId !== '' && item.activityId !== tableFilters.activityId) return false;
      if (tableFilters.userSource1 && tableFilters.userSource1 !== '全部' && item.userSource1 !== tableFilters.userSource1) return false;

      if (!inRange(item.lastLearnTime, tableFilters.lastLearnTime)) return false;
      if (!inRange(item.registerTime, tableFilters.registerTime)) return false;
      if (!inRange(item.examTime, tableFilters.examTime)) return false;

      return true;
    };

    const filteredData = lifecycleTableData.filter(matchesFilters);

    const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleDownload = () => {
      const csvHeader = ['用户UIN','认证名称','开始时间','最后学习时间','视频时长(分钟)','总学习时长(分钟)','总课时','已学课时','是否完成学习','考试UIN','用户来源','Name','企微id','考试类型','考试语言','考试时长','ExamCode','报名时间','考试时间','考场名称','考试方式','考试码','资格码','考试状态','分数','所属活动ID','导入原因','备注','系统编号','结算路径','购买方式','用户来源一级','用户来源二级','用户来源三级','是否使用免费代金券','证书状态','证书编号','证书失效时间','证书授予时间'];

      const rows = [csvHeader, ...filteredData.map(item => [
        item.uin, item.certName, item.startTime, item.lastLearnTime, item.videoDurationMin, item.totalLearnMinutes, item.totalLessons, item.learnedLessons, item.isCompleted,
        item.examUin, item.userSource, item.name, item.weworkId, item.examType, item.examLang, item.examDuration, item.ExamCode, item.registerTime, item.examTime, item.venueName,
        item.examMethod, item.examCode, item.qualificationCode, item.examStatus, item.score, item.activityId, item.importReason, item.notes, item.systemId, item.settlementPath,
        item.purchaseMethod, item.userSource1, item.userSource2, item.userSource3, item.usedFreeVoucher, item.certStatus, item.certNumber, item.certExpiry, item.certGrantTime
      ])];

      const csv = rows.map(r => r.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = '用户生命周期数据.csv';
      link.click();
    };

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">用户学习-报名-考试-持证全生命周期数据总表</h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all"
            >
              <Download className="w-4 h-4" />
              下载数据
            </button>
          </div>
        </div>

        <FilterPanel
          filters={[
            { key: 'certName', label: '认证名称', default: '全部', type: 'select', options: certOptions },
            { key: 'lastLearnTime', label: '最后学习时间', type: 'dateRange' },
            { key: 'registerTime', label: '报名时间', type: 'dateRange' },
            { key: 'examTime', label: '考试时间', type: 'dateRange' },
            { key: 'activityId', label: '所属活动ID', default: '全部' },
            { key: 'userSource1', label: '用户来源一级', type: 'select', options: userSourceOptions }
          ]}
          values={tableFilters}
          onChange={handleFilterChange}
          onReset={handleReset}
          onApply={handleApply}
          showApply={true}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">用户UIN</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">认证名称</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">开始时间</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">最后学习时间</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">视频时长(分钟)</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">总学习时长(分钟)</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">总课时</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">已学课时</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">是否完成学习</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考试UIN</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">用户来源</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">企微id</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考试类型</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考试语言</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考试时长</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">ExamCode</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">报名时间</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考试时间</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考场名称</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考试方式</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考试码</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">资格码</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考试状态</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">分数</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">所属活动ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">导入原因</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">备注</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">系统编号</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">结算路径</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">购买方式</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">用户来源一级</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">用户来源二级</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">用户来源三级</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">是否使用免费代金券</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">证书状态</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">证书编号</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">证书失效时间</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">证书授予时间</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-gray-900">{item.uin}</td>
                  <td className="px-4 py-3 text-gray-900">{item.certName}</td>
                  <td className="px-4 py-3 text-gray-600">{item.startTime}</td>
                  <td className="px-4 py-3 text-gray-600">{item.lastLearnTime}</td>
                  <td className="px-4 py-3 text-gray-600">{item.videoDurationMin}</td>
                  <td className="px-4 py-3 text-gray-600">{item.totalLearnMinutes}</td>
                  <td className="px-4 py-3 text-gray-600">{item.totalLessons}</td>
                  <td className="px-4 py-3 text-gray-600">{item.learnedLessons}</td>
                  <td className="px-4 py-3 text-gray-600">{item.isCompleted}</td>
                  <td className="px-4 py-3 text-gray-600">{item.examUin}</td>
                  <td className="px-4 py-3 text-gray-600">{item.userSource}</td>
                  <td className="px-4 py-3 text-gray-600">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600">{item.weworkId}</td>
                  <td className="px-4 py-3 text-gray-600">{item.examType}</td>
                  <td className="px-4 py-3 text-gray-600">{item.examLang}</td>
                  <td className="px-4 py-3 text-gray-600">{item.examDuration}</td>
                  <td className="px-4 py-3 text-gray-600">{item.ExamCode}</td>
                  <td className="px-4 py-3 text-gray-600">{item.registerTime}</td>
                  <td className="px-4 py-3 text-gray-600">{item.examTime}</td>
                  <td className="px-4 py-3 text-gray-600">{item.venueName}</td>
                  <td className="px-4 py-3 text-gray-600">{item.examMethod}</td>
                  <td className="px-4 py-3 text-gray-600">{item.examCode}</td>
                  <td className="px-4 py-3 text-gray-600">{item.qualificationCode}</td>
                  <td className="px-4 py-3 text-gray-600">{item.examStatus}</td>
                  <td className="px-4 py-3 text-gray-600">{item.score}</td>
                  <td className="px-4 py-3 text-gray-600">{item.activityId}</td>
                  <td className="px-4 py-3 text-gray-600">{item.importReason}</td>
                  <td className="px-4 py-3 text-gray-600">{item.notes}</td>
                  <td className="px-4 py-3 text-gray-600">{item.systemId}</td>
                  <td className="px-4 py-3 text-gray-600">{item.settlementPath}</td>
                  <td className="px-4 py-3 text-gray-600">{item.purchaseMethod}</td>
                  <td className="px-4 py-3 text-gray-600">{item.userSource1}</td>
                  <td className="px-4 py-3 text-gray-600">{item.userSource2}</td>
                  <td className="px-4 py-3 text-gray-600">{item.userSource3}</td>
                  <td className="px-4 py-3 text-gray-600">{item.usedFreeVoucher}</td>
                  <td className="px-4 py-3 text-gray-600">{item.certStatus}</td>
                  <td className="px-4 py-3 text-gray-600">{item.certNumber}</td>
                  <td className="px-4 py-3 text-gray-600">{item.certExpiry}</td>
                  <td className="px-4 py-3 text-gray-600">{item.certGrantTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            显示第 {startIndex + 1} 到 {Math.min(startIndex + itemsPerPage, lifecycleTableData.length)} 条，共 {lifecycleTableData.length} 条
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const userSourceData = [
    { name: '内部员工', value: 3200 },
    { name: '生态员工', value: 2800 },
    { name: '外部客户', value: 4500 }
  ];

  const dailyLearningData = [
    { date: '11-22', count: 145 },
    { date: '11-23', count: 168 },
    { date: '11-24', count: 152 },
    { date: '11-25', count: 189 },
    { date: '11-26', count: 203 },
    { date: '11-27', count: 178 },
    { date: '11-28', count: 195 }
  ];

  const registrationTrendData = [
    { date: '11-22', count: 112 },
    { date: '11-23', count: 135 },
    { date: '11-24', count: 128 },
    { date: '11-25', count: 148 },
    { date: '11-26', count: 162 },
    { date: '11-27', count: 143 },
    { date: '11-28', count: 156 }
  ];

  const certificationData = [
    { name: '云计算架构师', count: 2450 },
    { name: '数据分析师', count: 2180 },
    { name: '网络安全专家', count: 1820 },
    { name: 'AI工程师', count: 1750 }
  ];

  // 示例数据：按认证统计的学习完成率（已学课时/总课时 >= 0.8 的用户占比，单位：%）
  const completionRateByCert = [
    { name: '云计算架构师', rate: 72.5, completed: 1784, total: 2450 },
    { name: '数据分析师', rate: 68.9, completed: 1504, total: 2180 },
    { name: '网络安全专家', rate: 65.3, completed: 1189, total: 1820 },
    { name: 'AI工程师', rate: 70.1, completed: 1228, total: 1750 }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">考生全生命周期数据看板</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>更新时间: 2025-11-28 14:30</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                导出报表
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { id: 'overview', name: '总览' },
              { id: 'learning', name: '学习阶段' },
              { id: 'registration', name: '报名阶段' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-5 py-2 rounded-lg font-medium transition-all ${
                  selectedTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-6 py-6">
        {selectedTab === 'overview' && (
          <>
            <div className="grid grid-cols-4 gap-6 mb-6">
              <MetricCard title="总学习人次" value="10,500" icon={BookOpen} />
              <MetricCard title="总报名人次" value="8,200" icon={FileCheck} />
              <MetricCard title="总参考人次" value="7,380" icon={Users} />
              <MetricCard title="总持证人次" value="6,100" icon={Award} />
            </div>

            <div className="mb-6">
              <LifecycleTable />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">报名-持证转化漏斗</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">总报名人次</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">8,200 人</span>
                        <span className="text-xs text-gray-500 ml-2">(100%)</span>
                      </div>
                    </div>
                    <div 
                      className="relative h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm"
                      style={{ width: '100%' }}
                    >
                      <span>8,200</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-sm">
                      <span className="text-gray-400">↓ 转化率: </span>
                      <span className="font-semibold text-blue-600">90.0%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">总参考人次</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">7,380 人</span>
                        <span className="text-xs text-gray-500 ml-2">(90.0%)</span>
                      </div>
                    </div>
                    <div 
                      className="relative h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm"
                      style={{ width: '90%', minWidth: '100px' }}
                    >
                      <span>7,380</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-sm">
                      <span className="text-gray-400">↓ 转化率: </span>
                      <span className="font-semibold text-blue-600">82.7%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">总持证人次</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">6,100 人</span>
                        <span className="text-xs text-gray-500 ml-2">(74.4%)</span>
                      </div>
                    </div>
                    <div 
                      className="relative h-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm"
                      style={{ width: '74.4%', minWidth: '100px' }}
                    >
                      <span>6,100</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">整体转化率：</span>
                    <span className="text-blue-600 font-semibold ml-2">74.4%</span>
                    <span className="text-gray-400 ml-2">(报名→持证)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">用户来源分布</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={userSourceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" name="人数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {selectedTab === 'learning' && (
          <>
            <FilterPanel filters={[
              { label: '最后学习时间', default: '全部' },
              { label: '认证名称', default: '全部' },              { label: '所属活动ID（代金券使用情况）', default: '全部' },              { label: '用户来源一级（内部员工、生态员工、外部客户）', default: '全部' },
              { label: '用户来源二级', default: '全部' },
              { label: '用户来源三级', default: '全部' }
            ]} />

            <div className="grid grid-cols-4 gap-6 mb-6">
              <MetricCard title="当前活跃学习人数" value="3,420" change="+15.3%" trend="up" subtitle="最后学习时间不为空的用户总数" />
              <MetricCard title="学习完成人次" value="7,560" subtitle="单个用户在单门认证课程的学习进度达到80%及以上时计为1人次" />
              <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow h-full"></div>
              <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow h-full"></div>
            </div>


            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">学习完成率分布（按认证）</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={completionRateByCert}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} tickFormatter={value => `${value}%`} />
                    <Tooltip formatter={(value, name) => [`${value}%`, '完成率']} />
                    <Bar dataKey="rate" fill="#3b82f6" name="完成率 (%)" />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-3">完成率 = COUNT(已学课时／总课时 {'>='} 0.8) / COUNT(最后学习时间 IS NOT NULL) × 100%</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">学习进度分布</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { progress: '0-25%', '云计算架构师': 18.5, '数据分析师': 16.2, '网络安全专家': 17.8, 'AI工程师': 19.3 },
                    { progress: '25-50%', '云计算架构师': 22.1, '数据分析师': 24.5, '网络安全专家': 21.6, 'AI工程师': 20.4 },
                    { progress: '50-75%', '云计算架构师': 28.9, '数据分析师': 27.3, '网络安全专家': 29.1, 'AI工程师': 28.7 },
                    { progress: '75-100%', '云计算架构师': 30.5, '数据分析师': 32.0, '网络安全专家': 31.5, 'AI工程师': 31.6 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="progress" label={{ value: '学习进度', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis label={{ value: '占比(%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="云计算架构师" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="数据分析师" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="网络安全专家" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="AI工程师" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">学习趋势</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyLearningData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} name="新增人数" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {selectedTab === 'registration' && (
          <>
            <FilterPanel filters={[
              { label: '报名时间', default: '全部' },
              { label: '认证名称', default: '全部' },              { label: '所属活动ID（代金券使用情况）', default: '全部' },              { label: '用户来源一级（内部员工、生态员工、外部客户）', default: '全部' },
              { label: '用户来源二级', default: '全部' },
              { label: '用户来源三级', default: '全部' }
            ]} />

            <div className="grid grid-cols-4 gap-6 mb-6">
              <MetricCard title="总报名人次" value="8,200" subtitle="所选报名时间区间内报名考试的人次" />
              <MetricCard title="总报名人数" value="8,200" subtitle="所选报名时间区间内报名考试的用户总数" />
              <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow h-full"></div>
              <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow h-full"></div>
            </div>


            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">报名趋势</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={registrationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} name="报名人次" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">认证报名分布</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={certificationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" name="报名人次" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}




      </div>
    </div>
  );
};

export default DashboardPrototype;