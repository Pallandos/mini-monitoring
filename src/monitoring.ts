import * as si from 'systeminformation';
import express from 'express';
import cors from 'cors';

export interface ISystemInformation {
  cpu: si.Systeminformation.CpuData;
  system: si.Systeminformation.SystemData;
  mem: si.Systeminformation.MemData;
  os: si.Systeminformation.OsData;
  currentLoad: si.Systeminformation.CurrentLoadData;
  processes: si.Systeminformation.ProcessesData;
  diskLayout: si.Systeminformation.DiskLayoutData[];
  networkInterfaces: si.Systeminformation.NetworkInterfacesData | si.Systeminformation.NetworkInterfacesData[];
}

// Fonction pour collecter et sérialiser les données système
export async function getSystemInformation(): Promise<ISystemInformation> {
  const [cpu, system, mem, os, currentLoad, processes, diskLayout, networkInterfaces] = await Promise.all([
    si.cpu(),
    si.system(),
    si.mem(),
    si.osInfo(),
    si.currentLoad(),
    si.processes(),
    si.diskLayout(),
    si.networkInterfaces(),
  ]);

  return {
    cpu,
    system,
    mem,
    os,
    currentLoad,
    processes,
    diskLayout,
    networkInterfaces,
  };
}

// Serveur Express pour exposer l'API
export const app = express();

app.use(cors());
app.use(express.json());

// Route pour obtenir les infos système sérialisées
app.get('/api/v1/system-info', async (req, res) => {
  try {
    const data = await getSystemInformation();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Fail to obtain sys infos' });
  }
});
