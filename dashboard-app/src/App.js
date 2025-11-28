import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, Award, BookOpen, FileCheck, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPrototype = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

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

  const FunnelChart = () => {
    const stages = [
      { name: '总报名人数', value: 8200, percent: 100, rate: '-' },
      { name: '总参考人数', value: 7380, percent: 90.0, rate: '90.0%' },
      { name: '总持证人数', value: 6100, percent: 74.4, rate: '82.7%' }
    ];

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">全流程转化漏斗</h3>
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{stage.value.toLocaleString()} 人</span>
                  <span className="text-xs text-gray-500 ml-2">({stage.percent}%)</span>
                </div>
              </div>
              <div 
                className="relative h-14 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-semibold shadow-sm"
                style={{ width: `${Math.max(stage.percent, 20)}%`, minWidth: '150px' }}
              >
                <span className="text-lg">{stage.value.toLocaleString()}</span>
              </div>
              {index < stages.length - 1 && (
                <div className="flex items-center justify-center my-2">
                  <div className="text-sm">
                    <span className="text-gray-400">↓ 转化率: </span>
                    <span className="font-semibold text-blue-600">{stages[index + 1].rate}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-medium">整体转化率：</span>
            <span className="text-blue-600 font-semibold ml-2">74.4%</span>
            <span className="text-gray-400 ml-2">(报名→持证)</span>
          </div>
        </div>
      </div>
    );
  };

  const userSourceData = [
    { name: '官网直接访问', value: 3200 },
    { name: '微信公众号', value: 2800 },
    { name: '企业培训', value: 1850 },
    { name: '合作伙伴', value: 1420 },
    { name: '线下活动', value: 980 },
    { name: '搜索引擎', value: 750 }
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
              <FunnelChart />
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
              <MetricCard title="总学习人数" value="10,500" icon={BookOpen} subtitle="开始学习的考生总数" />
              <MetricCard title="当前活跃学习人数" value="3,420" change="+15.3%" trend="up" subtitle="本周期内有学习行为" />
              <MetricCard title="人均学习时长" value="142分钟" subtitle="所有考生平均" />
              <MetricCard title="学习完成率" value="72.5%" change="+3.8%" trend="up" subtitle="完成全部课时的占比" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">日均新增学习人数</h3>
                <ResponsiveContainer width="100%" height={280}>
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

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">学习进度分布</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10b981" name="人数" />
                  </BarChart>
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

            <div className="grid grid-cols-3 gap-6 mb-6">
              <MetricCard title="总报名人数" value="8,200" icon={FileCheck} subtitle="报名参加考试的总人数" />
              <MetricCard title="学习转报名率" value="78.1%" change="+2.3%" trend="up" subtitle="学习后报名的转化率" />
              <MetricCard title="本周新增报名" value="884" change="+8.5%" trend="up" subtitle="本周新增报名人数" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">报名趋势</h3>
                <ResponsiveContainer width="100%" height={280}>
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
                <ResponsiveContainer width="100%" height={280}>
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
              <MetricCard title="总参考人数" value="7,380" icon={Users} subtitle="实际参加考试的总人数" />
              <MetricCard title="考试通过率" value="82.7%" change="+2.4%" trend="up" subtitle="考试合格人数占比" />
              <MetricCard title="平均分数" value="79.3分" subtitle="所有考生平均考试分数" />
              <MetricCard title="代金券发放总数" value="2,850" subtitle="已发放的代金券数量" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow p-6 border-2 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">代金券考试通过率</h3>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="flex items-end gap-4">
                  <div className="text-4xl font-bold text-green-600">85.2%</div>
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">+3.1%</span>
                    <span className="text-gray-500 text-sm ml-1">环比</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  使用代金券且考试通过人数 / 使用代金券且完成考试人数
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">代金券使用统计</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">发放总数</p>
                    <p className="text-2xl font-bold text-blue-600">2,850</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">使用人数</p>
                    <p className="text-2xl font-bold text-green-600">2,430</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">使用率</p>
                    <p className="text-2xl font-bold text-purple-600">85.3%</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">通过人数</p>
                    <p className="text-2xl font-bold text-orange-600">2,070</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">分数段分布</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={scoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#ef4444" name="人数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">考试成绩趋势</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={examScoreTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[70, 85]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2} name="平均分" />
                  </LineChart>
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

            <div className="grid grid-cols-3 gap-6 mb-6">
              <MetricCard title="持证人数" value="6,100" icon={Award} subtitle="获得证书的总人数" />
              <MetricCard title="有效持证人数" value="5,985" subtitle="证书在有效期内的人数" />
              <MetricCard title="报名考证转化率" value="74.4%" change="+5.2%" trend="up" subtitle="持证人数/报名人数" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">发证趋势</h3>
                <ResponsiveContainer width="100%" height={280}>
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
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={certSubjectData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#14b8a6" name="持证人数" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">持证用户来源分布</h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={certUserSourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f97316" name="持证人数" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPrototype;