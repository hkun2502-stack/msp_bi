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

  const FilterPanel = ({ filters }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-800">筛选条件</h3>
        </div>
        <button className="text-blue-600 text-sm hover:text-blue-700">重置</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filters.map((filter, idx) => (
          <div key={idx}>
            <label className="block text-sm text-gray-600 mb-1">{filter.label}</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>{filter.default}</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );

  const LifecycleTable = () => {
    // 示例数据：生命周期全表
    const lifecycleTableData = [
      { id: 1, userId: 'U001', userName: '张三', source: '官网直接访问', learnStatus: '已完成', learnTime: '145分钟', registerStatus: '已报名', registerDate: '2025-04-05', examStatus: '已参考', examScore: '85分', certStatus: '已持证', certDate: '2025-04-15' },
      { id: 2, userId: 'U002', userName: '李四', source: '微信公众号', learnStatus: '进行中', learnTime: '89分钟', registerStatus: '已报名', registerDate: '2025-04-08', examStatus: '已参考', examScore: '92分', certStatus: '已持证', certDate: '2025-04-18' },
      { id: 3, userId: 'U003', userName: '王五', source: '企业培训', learnStatus: '已完成', learnTime: '156分钟', registerStatus: '已报名', registerDate: '2025-04-10', examStatus: '已参考', examScore: '78分', certStatus: '已持证', certDate: '2025-04-20' },
      { id: 4, userId: 'U004', userName: '赵六', source: '合作伙伴', learnStatus: '已完成', learnTime: '132分钟', registerStatus: '未报名', registerDate: '-', examStatus: '未参考', examScore: '-', certStatus: '未持证', certDate: '-' },
      { id: 5, userId: 'U005', userName: '周七', source: '线下活动', learnStatus: '已完成', learnTime: '168分钟', registerStatus: '已报名', registerDate: '2025-04-12', examStatus: '已参考', examScore: '88分', certStatus: '已持证', certDate: '2025-04-22' },
      { id: 6, userId: 'U006', userName: '吴八', source: '搜索引擎', learnStatus: '进行中', learnTime: '95分钟', registerStatus: '已报名', registerDate: '2025-04-14', examStatus: '未参考', examScore: '-', certStatus: '未持证', certDate: '-' },
      { id: 7, userId: 'U007', userName: '郑九', source: '官网直接访问', learnStatus: '已完成', learnTime: '142分钟', registerStatus: '已报名', registerDate: '2025-04-16', examStatus: '已参考', examScore: '91分', certStatus: '已持证', certDate: '2025-04-25' },
      { id: 8, userId: 'U008', userName: '孙十', source: '微信公众号', learnStatus: '已完成', learnTime: '150分钟', registerStatus: '已报名', registerDate: '2025-04-18', examStatus: '已参考', examScore: '84分', certStatus: '已持证', certDate: '2025-04-28' },
      { id: 9, userId: 'U009', userName: '何十一', source: '企业培训', learnStatus: '进行中', learnTime: '76分钟', registerStatus: '已报名', registerDate: '2025-04-20', examStatus: '未参考', examScore: '-', certStatus: '未持证', certDate: '-' },
      { id: 10, userId: 'U010', userName: '林十二', source: '合作伙伴', learnStatus: '已完成', learnTime: '138分钟', registerStatus: '已报名', registerDate: '2025-04-22', examStatus: '已参考', examScore: '86分', certStatus: '已持证', certDate: '2025-05-02' },
      { id: 11, userId: 'U011', userName: '高十三', source: '线下活动', learnStatus: '已完成', learnTime: '154分钟', registerStatus: '未报名', registerDate: '-', examStatus: '未参考', examScore: '-', certStatus: '未持证', certDate: '-' },
      { id: 12, userId: 'U012', userName: '宋十四', source: '搜索引擎', learnStatus: '已完成', learnTime: '148分钟', registerStatus: '已报名', registerDate: '2025-04-24', examStatus: '已参考', examScore: '79分', certStatus: '已持证', certDate: '2025-05-05' },
    ];

    const totalPages = Math.ceil(lifecycleTableData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = lifecycleTableData.slice(startIndex, startIndex + itemsPerPage);

    const handleDownload = () => {
      const csv = [
        ['用户ID', '用户名', '来源', '学习状态', '学习时长', '报名状态', '报名日期', '考试状态', '考试成绩', '持证状态', '发证日期'],
        ...lifecycleTableData.map(item => [
          item.userId, item.userName, item.source, item.learnStatus, item.learnTime, 
          item.registerStatus, item.registerDate, item.examStatus, item.examScore, 
          item.certStatus, item.certDate
        ])
      ].map(row => row.join(',')).join('\n');
      
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
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all"
          >
            <Download className="w-4 h-4" />
            下载数据
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">用户ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">用户名</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">来源</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">学习状态</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">学习时长</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">报名状态</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">报名日期</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考试状态</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">考试成绩</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">持证状态</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">发证日期</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-gray-900">{item.userId}</td>
                  <td className="px-4 py-3 text-gray-900">{item.userName}</td>
                  <td className="px-4 py-3 text-gray-600">{item.source}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.learnStatus === '已完成' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.learnStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.learnTime}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.registerStatus === '已报名' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.registerStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.registerDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.examStatus === '已参考' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.examStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.examScore}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.certStatus === '已持证' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.certStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.certDate}</td>
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

  const progressData = [
    { range: '0-25%', count: 1850 },
    { range: '25-50%', count: 2340 },
    { range: '50-75%', count: 2980 },
    { range: '75-100%', count: 3330 }
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

  const scoreData = [
    { range: '0-60', count: 580 },
    { range: '60-70', count: 1240 },
    { range: '70-80', count: 2150 },
    { range: '80-90', count: 2380 },
    { range: '90-100', count: 1030 }
  ];

  const examScoreTrendData = [
    { date: '11-22', score: 77.5 },
    { date: '11-23', score: 78.2 },
    { date: '11-24', score: 79.1 },
    { date: '11-25', score: 78.8 },
    { date: '11-26', score: 79.5 },
    { date: '11-27', score: 80.2 },
    { date: '11-28', score: 79.3 }
  ];

  const certificateTrendData = [
    { date: '11-22', count: 95 },
    { date: '11-23', count: 108 },
    { date: '11-24', count: 102 },
    { date: '11-25', count: 118 },
    { date: '11-26', count: 125 },
    { date: '11-27', count: 112 },
    { date: '11-28', count: 120 }
  ];

  const certSubjectData = [
    { name: '云计算架构师', count: 1980 },
    { name: '数据分析师', count: 1750 },
    { name: '网络安全专家', count: 1520 },
    { name: 'AI工程师', count: 850 }
  ];

  const certUserSourceData = [
    { name: '官网直接访问', value: 2150 },
    { name: '微信公众号', value: 1820 },
    { name: '企业培训', value: 1280 },
    { name: '合作伙伴', value: 580 },
    { name: '线下活动', value: 270 }
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
              { id: 'registration', name: '报名阶段' },
              { id: 'exam', name: '考试结果' },
              { id: 'certificate', name: '持证阶段' }
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
              <MetricCard title="总学习人数" value="10,500" icon={BookOpen} />
              <MetricCard title="总报名人数" value="8,200" icon={FileCheck} />
              <MetricCard title="总参考人数" value="7,380" icon={Users} />
              <MetricCard title="总持证人数" value="6,100" icon={Award} />
            </div>

            <div className="mb-6">
              <LifecycleTable />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">全流程转化漏斗</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">总报名人数</span>
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
                      <span className="text-sm font-medium text-gray-700">总参考人数</span>
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
                      <span className="text-sm font-medium text-gray-700">总持证人数</span>
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
              { label: '学习时间', default: '2025-04-01至今' },
              { label: '认证名称', default: '全部' },
              { label: '用户来源一级', default: '全部' },
              { label: '用户来源二级', default: '全部' },
              { label: '用户来源三级', default: '全部' }
            ]} />

            <div className="grid grid-cols-4 gap-6 mb-6">
              <MetricCard title="当前活跃学习人数" value="3,420" change="+15.3%" trend="up" subtitle="最后学习时间不为空的用户总数" />
              <MetricCard title="学习完成人数" value="7,560" subtitle="不同认证已完成学习的用户总数" />
              <MetricCard title="学习参与人数" value="10,500" subtitle="实际参加学习的用户总数" />
              <MetricCard title="人均学习时长" value="142分钟" subtitle="所有考生平均学习时长" />
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">指标说明</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">当前活跃学习人数</p>
                  <p className="text-gray-600">最后学习时间不为空的用户总数</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">学习完成人数</p>
                  <p className="text-gray-600">不同认证已完成学习的用户总数</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">学习参与人数</p>
                  <p className="text-gray-600">实际参加学习的用户总数</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">人均学习时长</p>
                  <p className="text-gray-600">所有考生平均学习时长</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">学习完成率分布</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { range: '0-25%', count: 1850, percent: '17.6%' },
                    { range: '25-50%', count: 2340, percent: '22.3%' },
                    { range: '50-75%', count: 2980, percent: '28.4%' },
                    { range: '75-100%', count: 3330, percent: '31.7%' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" name="人数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">学习进度分布</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { name: '0-25%', value: 17.6, count: 1850 },
                    { name: '25-50%', value: 22.3, count: 2340 },
                    { name: '50-75%', value: 28.4, count: 2980 },
                    { name: '75-100%', value: 31.7, count: 3330 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="占比(%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">日均新增学习人数</h3>
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
              { label: '报名时间', default: '2025-04-01至今' },
              { label: '认证名称', default: '全部' },
              { label: '用户来源一级', default: '全部' },
              { label: '用户来源二级', default: '全部' },
              { label: '用户来源三级', default: '全部' }
            ]} />

            <div className="grid grid-cols-4 gap-6 mb-6">
              <MetricCard title="总报名人数" value="8,200" subtitle="所选报名时间至今报名参加考试的用户总数" />
              <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow h-full"></div>
              <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow h-full"></div>
              <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow h-full"></div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">指标说明</h3>
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">总报名人数</p>
                  <p className="text-gray-600">所选报名时间至今报名参加考试的用户总数</p>
                </div>
              </div>
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
                    <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} name="报名人数" />
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
                    <Bar dataKey="count" fill="#8b5cf6" name="报名人数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {selectedTab === 'exam' && (
          <>
            <FilterPanel filters={[
              { label: '考试时间', default: '2025-04-01至今' },
              { label: '认证名称', default: '全部' },
              { label: '用户来源一级', default: '全部' },
              { label: '用户来源二级', default: '全部' },
              { label: '用户来源三级', default: '全部' }
            ]} />

            <div className="grid grid-cols-4 gap-6 mb-6">
              <MetricCard title="总参考人数" value="7,380" subtitle="实际参加考试的用户总数" />
              <MetricCard title="平均参考次数" value="1.2次" subtitle="每个考生平均参考多少次" />
              <MetricCard title="考试通过率" value="82.7%" subtitle="通过考试的用户占参加考试的用户总数的百分比" />
              <MetricCard title="使用免费代金券考试通过率" value="85.2%" subtitle="使用代金券且考试通过的用户数/使用代金券且完成考试的用户总数" />
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">指标说明</h3>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">总参考人数</p>
                  <p className="text-gray-600">实际参加考试的用户总数</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">平均参考次数</p>
                  <p className="text-gray-600">每个考生平均参考多少次</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">考试通过率</p>
                  <p className="text-gray-600">通过考试的用户占比</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">使用免费代金券考试通过率</p>
                  <p className="text-gray-600">使用代金券且通过的占比</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">考试通过率分布-认证</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={certificationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" name="通过人数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">考试通过率分布-用户来源</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userSourceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" name="通过人数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {selectedTab === 'certificate' && (
          <>
            <FilterPanel filters={[
              { label: '发证时间', default: '2025-04-01至今' },
              { label: '认证名称', default: '全部' },
              { label: '用户来源一级', default: '全部' },
              { label: '用户来源二级', default: '全部' },
              { label: '用户来源三级', default: '全部' }
            ]} />

            <div className="grid grid-cols-4 gap-6 mb-6">
              <MetricCard title="持证人数" value="6,100" subtitle="获得证书的用户总数" />
              <MetricCard title="有效持证人数" value="5,985" subtitle="获得证书且证书在有效期内的用户总数" />
              <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow h-full"></div>
              <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow h-full"></div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">指标说明</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">持证人数</p>
                  <p className="text-gray-600">获得证书的用户总数</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-1">有效持证人数</p>
                  <p className="text-gray-600">获得证书且证书在有效期内的用户总数</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">发证趋势</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={certificateTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={2} name="发证数量" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">证书科目分布</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={certSubjectData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#14b8a6" name="持证人数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">持证用户来源分布</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={certUserSourceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#f97316" name="持证人数" />
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