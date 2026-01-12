import { useState } from 'react';
import { useRouter } from 'next/router';

interface Variable {
  id: string;
  name: string;
  description: string;
  type: 'number' | 'string' | 'boolean' | 'range';
  value?: any;
}

interface Pillar {
  id: string;
  name: string;
  description: string;
  variables: string[]; // Variable IDs
}

interface Thesis {
  id: string;
  name: string;
  description: string;
  conditions: {
    pillarId: string;
    operator: 'and' | 'or';
    weight: number;
  }[];
}

export default function ConfigureThesis() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'variables' | 'pillars' | 'thesis'>('variables');

  const [variables, setVariables] = useState<Variable[]>([
    {
      id: 'var-1',
      name: 'HScore',
      description: 'Overall startup health score',
      type: 'range',
      value: { min: 75, max: 100 },
    },
    {
      id: 'var-2',
      name: 'Revenue Growth Rate',
      description: 'Monthly revenue growth percentage',
      type: 'range',
      value: { min: 10, max: 100 },
    },
    {
      id: 'var-3',
      name: 'Founder Experience',
      description: 'Founder has prior startup experience',
      type: 'boolean',
      value: true,
    },
    {
      id: 'var-4',
      name: 'Industry',
      description: 'Startup industry/sector',
      type: 'string',
      value: 'AI/ML',
    },
    {
      id: 'var-5',
      name: 'Funding Stage',
      description: 'Current funding round',
      type: 'string',
      value: 'Seed',
    },
    {
      id: 'var-6',
      name: 'TAM Size',
      description: 'Total Addressable Market',
      type: 'range',
      value: { min: 1000000000, max: 10000000000 },
    },
  ]);

  const [pillars, setPillars] = useState<Pillar[]>([
    {
      id: 'pillar-1',
      name: 'Market Potential',
      description: 'Evaluates market size and growth potential',
      variables: ['var-6', 'var-2'],
    },
    {
      id: 'pillar-2',
      name: 'Team Quality',
      description: 'Assesses founding team experience and capabilities',
      variables: ['var-3'],
    },
    {
      id: 'pillar-3',
      name: 'Startup Health',
      description: 'Overall startup health and traction metrics',
      variables: ['var-1', 'var-2'],
    },
  ]);

  const [theses, setTheses] = useState<Thesis[]>([
    {
      id: 'thesis-1',
      name: 'AI/ML Seed Stage Focus',
      description: 'Target AI/ML startups in seed stage with strong market potential',
      conditions: [
        { pillarId: 'pillar-1', operator: 'and', weight: 40 },
        { pillarId: 'pillar-2', operator: 'and', weight: 30 },
        { pillarId: 'pillar-3', operator: 'and', weight: 30 },
      ],
    },
  ]);

  const [editingVariable, setEditingVariable] = useState<string | null>(null);
  const [editingPillar, setEditingPillar] = useState<string | null>(null);
  const [editingThesis, setEditingThesis] = useState<string | null>(null);

  const getVariableName = (id: string) => {
    return variables.find(v => v.id === id)?.name || id;
  };

  const getPillarName = (id: string) => {
    return pillars.find(p => p.id === id)?.name || id;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFBFC' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/investor')}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                <svg className="w-6 h-6" style={{ color: '#F59E0B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold" style={{ color: '#111928' }}>Configure Thesis</h1>
                <p className="text-xs text-gray-500">Define your investment criteria</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm mb-6">
          <div className="flex border-b border-gray-200/50">
            {(['variables', 'pillars', 'thesis'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? 'text-white border-b-2'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={
                  activeTab === tab
                    ? { backgroundColor: '#111928', borderBottomColor: '#111928' }
                    : {}
                }
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Variables Tab */}
            {activeTab === 'variables' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1" style={{ color: '#111928' }}>Variables</h2>
                    <p className="text-sm text-gray-600">Basic attributes for startup analysis</p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: '#111928' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1F2937'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111928'}
                  >
                    + Add Variable
                  </button>
                </div>

                <div className="space-y-4">
                  {variables.map((variable) => (
                    <div
                      key={variable.id}
                      className="p-5 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-300"
                      style={{ backgroundColor: '#FAFBFC' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-base font-bold mb-1" style={{ color: '#111928' }}>
                            {variable.name}
                          </h3>
                          <p className="text-sm text-gray-600">{variable.description}</p>
                          <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-lg bg-gray-100 text-gray-700">
                            {variable.type}
                          </span>
                        </div>
                        <button
                          onClick={() => setEditingVariable(editingVariable === variable.id ? null : variable.id)}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                      {editingVariable === variable.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-sm text-gray-600 mb-2">Current Value:</div>
                          <div className="text-sm font-semibold" style={{ color: '#111928' }}>
                            {typeof variable.value === 'object' 
                              ? `${variable.value.min} - ${variable.value.max}`
                              : String(variable.value)
                            }
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pillars Tab */}
            {activeTab === 'pillars' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1" style={{ color: '#111928' }}>Pillars</h2>
                    <p className="text-sm text-gray-600">Groups of variables forming segments for startup evaluation</p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: '#111928' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1F2937'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111928'}
                  >
                    + Add Pillar
                  </button>
                </div>

                <div className="space-y-4">
                  {pillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="p-5 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-300"
                      style={{ backgroundColor: '#FAFBFC' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-base font-bold mb-1" style={{ color: '#111928' }}>
                            {pillar.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">{pillar.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {pillar.variables.map((varId) => (
                              <span
                                key={varId}
                                className="px-3 py-1 text-xs font-semibold rounded-lg"
                                style={{ backgroundColor: '#DBEAFE', color: '#1E40AF' }}
                              >
                                {getVariableName(varId)}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => setEditingPillar(editingPillar === pillar.id ? null : pillar.id)}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Thesis Tab */}
            {activeTab === 'thesis' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1" style={{ color: '#111928' }}>Thesis</h2>
                    <p className="text-sm text-gray-600">Define investment thesis using pillars and variables</p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: '#111928' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1F2937'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111928'}
                  >
                    + Add Thesis
                  </button>
                </div>

                <div className="space-y-4">
                  {theses.map((thesis) => (
                    <div
                      key={thesis.id}
                      className="p-5 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-300"
                      style={{ backgroundColor: '#FAFBFC' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-base font-bold mb-1" style={{ color: '#111928' }}>
                            {thesis.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">{thesis.description}</p>
                          <div className="space-y-2">
                            <div className="text-xs font-semibold text-gray-500 mb-2">Conditions:</div>
                            {thesis.conditions.map((condition, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 rounded-lg bg-white border border-gray-200"
                              >
                                <span className="text-sm font-semibold" style={{ color: '#111928' }}>
                                  {getPillarName(condition.pillarId)}
                                </span>
                                <span className="text-xs text-gray-500">({condition.operator.toUpperCase()})</span>
                                <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-lg bg-gray-100 text-gray-700">
                                  Weight: {condition.weight}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => setEditingThesis(editingThesis === thesis.id ? null : thesis.id)}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

