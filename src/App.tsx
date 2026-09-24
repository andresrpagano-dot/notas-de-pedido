import React, { useState, useMemo } from 'react';

// --- ICONOS SVG NATIVOS (Autónomos) ---
const EyeIcon = () => (
  <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

// --- DATOS INICIALES ---
const STAGES = [
  "01. Trabajos Preliminares", "02. Movimiento de Suelos", "03. Estructura de Hormigón",
  "04. Mampostería", "05. Aislaciones", "06. Cubiertas / Techos", "07. Revoques",
  "08. Cielorrasos", "09. Contrapisos y Carpetas", "10. Revestimientos y Pisos",
  "11. Instalación Sanitaria", "12. Instalación de Gas", "13. Instalación Eléctrica",
  "14. Carpintería de Aluminio/Madera", "15. Pintura", "16. Herrería",
  "17. Parquización y Exteriores", "18. Limpieza de Obra"
];

const INITIAL_PROJECTS = [
  { id: 'p1', name: 'Edificio Docta - Torre A', code: 'DOC-TA' },
  { id: 'p2', name: 'Obra Clementina Lote 12', code: 'CLEm-12' },
];

const INITIAL_USERS = [
  { id: 'u1', name: 'Juan Contratista', email: 'juan@obra.com', globalRole: 'Contractor' },
  { id: 'u2', name: 'Arq. María', email: 'maria@estudio.com', globalRole: 'Architect' },
  { id: 'u3', name: 'Carlos Compras', email: 'carlos@corralon.com', globalRole: 'Buyer' },
  { id: 'u4', name: 'Gerencia General', email: 'gerencia@empresa.com', globalRole: 'Observer' },
  { id: 'u5', name: 'Andrés Pagano (Admin)', email: 'andres@admin.com', globalRole: 'Manager' },
];

const INITIAL_ASSIGNMENTS = [
  { userId: 'u1', projectId: 'p1', role: 'Contractor' },
  { userId: 'u2', projectId: 'p1', role: 'Architect' },
  { userId: 'u3', projectId: 'p1', role: 'Buyer' },
  { userId: 'u4', projectId: 'p1', role: 'Observer' },
  { userId: 'u5', projectId: 'p1', role: 'Manager' },
  { userId: 'u1', projectId: 'p2', role: 'Contractor' },
  { userId: 'u5', projectId: 'p2', role: 'Manager' },
];

const INITIAL_ORDERS = [
  {
    id: 'ord-101',
    projectId: 'p1',
    stage: '03. Estructura de Hormigón',
    createdAt: '2026-09-20',
    requestedBy: 'Juan Contratista',
    status: 'Pending',
    architectNote: '',
    buyerNote: '',
    items: [
      { id: 'i1', description: 'Hierro del 12 (barras 12m)', unit: 'Barras', quantity: 50, dateNeeded: '2026-09-28' },
      { id: 'i2', description: 'Cemento Portland 50kg', unit: 'Bolsas', quantity: 30, dateNeeded: '2026-09-25' },
    ]
  }
];

export default function App() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const [activeUser, setActiveUser] = useState(users[0]);
  const [selectedProjectId, setSelectedProjectId] = useState('p1');

  // Determinar rol efectivo en el proyecto activo
  const activeRole = useMemo(() => {
    if (activeUser.globalRole === 'Manager') return 'Manager';
    const assign = assignments.find(a => a.userId === activeUser.id && a.projectId === selectedProjectId);
    return assign ? assign.role : 'NoAccess';
  }, [activeUser, selectedProjectId, assignments]);

  // Modales y formularios
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState(STAGES[0]);
  const [items, setItems] = useState([{ id: Date.now(), description: '', unit: 'Unidades', quantity: 1, dateNeeded: '' }]);

  const [activeOrder, setActiveOrder] = useState(null);
  const [architectModalAction, setArchitectModalAction] = useState(null);
  const [architectNoteInput, setArchitectNoteInput] = useState('');
  const [buyerNoteInput, setBuyerNoteInput] = useState('');

  // Manejadores para solicitud
  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), description: '', unit: 'Unidades', quantity: 1, dateNeeded: '' }]);
  };

  const handleRemoveItem = (id) => {
    if (items.length > 1) setItems(items.filter(i => i.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      projectId: selectedProjectId,
      stage: selectedStage,
      createdAt: new Date().toISOString().split('T')[0],
      requestedBy: activeUser.name,
      status: 'Pending',
      architectNote: '',
      buyerNote: '',
      items: items.map(i => ({ ...i, quantity: Number(i.quantity) }))
    };
    setOrders([newOrder, ...orders]);
    setIsNewOrderOpen(false);
    setItems([{ id: Date.now(), description: '', unit: 'Unidades', quantity: 1, dateNeeded: '' }]);
  };

  // Decisiones de Arquitecto
  const handleArchitectDecision = (orderId, status, note) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status, architectNote: note } : o));
    setArchitectModalAction(null);
    setActiveOrder(null);
  };

  // Decisiones de Compras
  const handleBuyerDecision = (orderId, status, note) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status, buyerNote: note } : o));
    setActiveOrder(null);
  };

  // Cambio de asignación (Admin Manager)
  const handleAssignmentChange = (userId, projectId, role) => {
    const filtered = assignments.filter(a => !(a.userId === userId && a.projectId === projectId));
    if (role !== 'None') {
      setAssignments([...filtered, { userId, projectId, role }]);
    } else {
      setAssignments(filtered);
    }
  };

  // Filtrado de pedidos según visibilidad del proyecto
  const visibleOrders = useMemo(() => {
    return orders.filter(o => o.projectId === selectedProjectId);
  }, [orders, selectedProjectId]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-12">
      {/* HEADER DE CONTROL */}
      <header className="bg-slate-900 text-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white font-black p-2 rounded-lg text-xl tracking-wider">OS</div>
            <div>
              <h1 className="font-bold text-lg leading-none">ObraSync</h1>
              <span className="text-xs text-slate-400">Control & Pedidos de Materiales</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Selector de Usuario / Rol */}
            <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
              <label className="block text-slate-400 mb-1">Simular Usuario:</label>
              <select
                value={activeUser.id}
                onChange={(e) => setActiveUser(users.find(u => u.id === e.target.value))}
                className="bg-slate-900 text-white font-semibold rounded p-1 border border-slate-600 outline-none"
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.globalRole})</option>
                ))}
              </select>
            </div>

            {/* Selector de Proyecto */}
            <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
              <label className="block text-slate-400 mb-1">Proyecto Activo:</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="bg-slate-900 text-white font-semibold rounded p-1 border border-slate-600 outline-none"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Rol resultante */}
            <div className="bg-blue-950 border border-blue-800 text-blue-200 px-3 py-2 rounded-lg text-center">
              <span className="block text-slate-400 text-[10px] uppercase font-bold">Rol en Obra</span>
              <span className="font-extrabold text-sm">{activeRole}</span>
            </div>
          </div>
        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <main className="max-w-6xl mx-auto p-4 md:p-6">

        {/* SI NO TIENE ACCESO */}
        {activeRole === 'NoAccess' ? (
          <div className="bg-white p-8 rounded-xl shadow text-center my-12 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-700 mb-2">Sin Acceso a este Proyecto</h2>
            <p className="text-slate-500 text-sm">El usuario activo no posee permisos asignados para visualizar este proyecto.</p>
          </div>
        ) : (
          <>
            {/* PANEL DE GERENCIA / MANAGER */}
            {activeRole === 'Manager' && (
              <div className="mb-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center mb-3 text-slate-800">
                  <UsersIcon />
                  <h2 className="font-bold text-base">Panel de Gestión de Accesos (Manager)</h2>
                </div>
                <p className="text-xs text-slate-500 mb-4">Asigne roles específicos a los miembros de la obra para habilitar los flujos de aprobaciones.</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b bg-slate-50 text-slate-600">
                        <th className="p-2">Usuario</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Rol en {projects.find(p => p.id === selectedProjectId)?.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => {
                        if (u.globalRole === 'Manager') return null;
                        const currentAssign = assignments.find(a => a.userId === u.id && a.projectId === selectedProjectId);
                        return (
                          <tr key={u.id} className="border-b hover:bg-slate-50">
                            <td className="p-2 font-medium">{u.name}</td>
                            <td className="p-2 text-slate-500">{u.email}</td>
                            <td className="p-2">
                              <select
                                value={currentAssign ? currentAssign.role : 'None'}
                                onChange={(e) => handleAssignmentChange(u.id, selectedProjectId, e.target.value)}
                                className="border rounded p-1 bg-white text-xs"
                              >
                                <option value="None">Sin Acceso</option>
                                <option value="Contractor">Contratista (Solicitante)</option>
                                <option value="Architect">Arquitecto (Aprobador)</option>
                                <option value="Buyer">Compras / Depósito</option>
                                <option value="Observer">Observador (Solo Lectura)</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* BARRA DE ACCIÓN PRINCIPAL */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <BuildingIcon />
                  {projects.find(p => p.id === selectedProjectId)?.name}
                </h2>
                <p className="text-xs text-slate-500">Gestión de acopio y requerimientos de materiales en sitio.</p>
              </div>

              {(activeRole === 'Contractor' || activeRole === 'Manager') && (
                <button
                  onClick={() => setIsNewOrderOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-lg shadow flex items-center transition"
                >
                  <PlusIcon /> Nueva Solicitud
                </button>
              )}
            </div>

            {/* TABLA DE SOLICITUDES */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-700">Solicitudes Registradas</h3>
                <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600 font-semibold">{visibleOrders.length} pedidos</span>
              </div>

              {visibleOrders.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">
                  No hay requerimientos cargados para este proyecto.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {visibleOrders.map((order) => (
                    <div key={order.id} className="p-4 hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{order.id}</span>
                          <span className="text-xs bg-slate-100 border text-slate-600 px-2 py-0.5 rounded-full font-medium">
                            {order.stage}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Solicitado por <span className="font-semibold text-slate-700">{order.requestedBy}</span> el {order.createdAt}
                        </p>
                        <div className="text-xs text-slate-600 font-medium pt-1">
                          {order.items.length} ítems: {order.items.map(i => `${i.description} (${i.quantity} ${i.unit})`).join(', ')}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-center">
                        {/* ESTADO BADGE */}
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {order.status === 'Pending' && 'Pendiente Arq.'}
                          {order.status === 'Approved' && 'Aprobado (En Compras)'}
                          {order.status === 'Rejected' && 'Rechazado'}
                          {order.status === 'Purchased' && 'Comprado / Despachado'}
                        </span>

                        {/* ACCIONES */}
                        <button
                          onClick={() => setActiveOrder(order)}
                          className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg transition"
                        >
                          <EyeIcon /> Ver Detalle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* MODAL NUEVA SOLICITUD */}
      {isNewOrderOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Cargar Nueva Solicitud de Materiales</h3>
            <p className="text-xs text-slate-500 mb-4">Complete los ítems requeridos especificando cantidad y fecha límite en obra.</p>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Etapa de la Obra:</label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs font-medium bg-white"
                >
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Detalle de Materiales:</label>
                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-12 sm:col-span-5">
                        <input
                          type="text"
                          placeholder="Descripción (ej: Hierro del 10)"
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                          required
                          className="w-full border border-slate-300 rounded p-1.5 text-xs"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <input
                          type="text"
                          placeholder="Unidad"
                          value={item.unit}
                          onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                          required
                          className="w-full border border-slate-300 rounded p-1.5 text-xs"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <input
                          type="number"
                          min="1"
                          placeholder="Cant."
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                          required
                          className="w-full border border-slate-300 rounded p-1.5 text-xs"
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <input
                          type="date"
                          value={item.dateNeeded}
                          onChange={(e) => handleItemChange(item.id, 'dateNeeded', e.target.value)}
                          required
                          className="w-full border border-slate-300 rounded p-1.5 text-xs"
                        />
                      </div>
                      <div className="col-span-1 text-right">
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-rose-600 hover:text-rose-800"
                          >
                            <TrashIcon />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center"
                >
                  <PlusIcon /> Agregar otro ítem
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsNewOrderOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                >
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DETALLE DE SOLICITUD */}
      {activeOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4 border-b pb-3">
              <div>
                <span className="text-xs font-bold text-blue-600">{activeOrder.stage}</span>
                <h3 className="text-lg font-bold text-slate-900">Solicitud {activeOrder.id}</h3>
                <p className="text-xs text-slate-500">Cargada el {activeOrder.createdAt} por {activeOrder.requestedBy}</p>
              </div>
              <button onClick={() => setActiveOrder(null)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>

            {/* TABLA DE ITEMS */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-700 mb-2">Listado de Materiales:</h4>
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 text-slate-600 border-b">
                  <tr>
                    <th className="p-2">Material / Descripción</th>
                    <th className="p-2">Cantidad</th>
                    <th className="p-2">Unidad</th>
                    <th className="p-2">Fecha Límite en Obra</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {activeOrder.items.map(item => (
                    <tr key={item.id}>
                      <td className="p-2 font-medium">{item.description}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">{item.unit}</td>
                      <td className="p-2 text-rose-600 font-semibold">{item.dateNeeded}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* NOTAS EXISTENTES */}
            {activeOrder.architectNote && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                <span className="font-bold block">Observación del Arquitecto:</span>
                {activeOrder.architectNote}
              </div>
            )}

            {activeOrder.buyerNote && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
                <span className="font-bold block">Nota de Compras / Gestión:</span>
                {activeOrder.buyerNote}
              </div>
            )}

            {/* SECCIÓN DE ACCIONES SEGÚN ROL */}

            {/* ACCIONES DE ARQUITECTO */}
            {(activeRole === 'Architect' || activeRole === 'Manager') && activeOrder.status === 'Pending' && (
              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800">Evaluación del Arquitecto:</h4>
                <textarea
                  placeholder="Añadir nota u observación opcional..."
                  value={architectNoteInput}
                  onChange={(e) => setArchitectNoteInput(e.target.value)}
                  className="w-full text-xs p-2 border rounded-lg border-slate-300 outline-none"
                  rows={2}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleArchitectDecision(activeOrder.id, 'Rejected', architectNoteInput)}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow"
                  >
                    <XIcon /> Rechazar
                  </button>
                  <button
                    onClick={() => handleArchitectDecision(activeOrder.id, 'Approved', architectNoteInput)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow"
                  >
                    <CheckIcon /> Aprobar Solicitud
                  </button>
                </div>
              </div>
            )}

            {/* ACCIONES DE COMPRAS */}
            {(activeRole === 'Buyer' || activeRole === 'Manager') && activeOrder.status === 'Approved' && (
              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800">Gestión de Compras y Proveedores:</h4>
                <textarea
                  placeholder="Detalles del pedido al corralón / nro de remito..."
                  value={buyerNoteInput}
                  onChange={(e) => setBuyerNoteInput(e.target.value)}
                  className="w-full text-xs p-2 border rounded-lg border-slate-300 outline-none"
                  rows={2}
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handleBuyerDecision(activeOrder.id, 'Purchased', buyerNoteInput)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow"
                  >
                    <CheckIcon /> Marcar como Comprado / Enviado a Obra
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveOrder(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
