export type OrderStatus = 'new' | 'in_progress' | 'paused' | 'completed';

export type Order = {
  id: string;
  title: string;
  site: string;
  status: OrderStatus;
  updatedAt: string;
};

export type Camera = {
  id: string;
  name: string;
  site: string;
  hlsUrl: string;
};

export const mockOrders: Order[] = [
  { id: 'ORD-1001', title: 'Монтаж фундамента', site: 'Объект А', status: 'in_progress', updatedAt: new Date().toISOString() },
  { id: 'ORD-1002', title: 'Поставка арматуры', site: 'Объект Б', status: 'paused', updatedAt: new Date().toISOString() },
  { id: 'ORD-1003', title: 'Заливка бетона', site: 'Объект А', status: 'new', updatedAt: new Date().toISOString() },
  { id: 'ORD-1004', title: 'Кладка стен', site: 'Объект В', status: 'completed', updatedAt: new Date().toISOString() },
];

export const mockCameras: Camera[] = [
  {
    id: 'CAM-01',
    name: 'Кран 1 — обзор',
    site: 'Объект А',
    hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
  {
    id: 'CAM-02',
    name: 'Периметр север',
    site: 'Объект Б',
    hlsUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  },
];