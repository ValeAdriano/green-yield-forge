import api from '@/lib/api';
import { Project, AggregateProject } from '@/types';
import { ProjectCreate, ProjectUpdate } from '@/lib/validators';

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get('/projects');
    return data;
  },

  getById: async (id: string): Promise<Project> => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },

  getAggregate: async (id: string): Promise<AggregateProject> => {
    const { data } = await api.get(`/aggregate/project/${id}`);
    return data;
  },

  create: async (project: ProjectCreate): Promise<Project> => {
    const { data } = await api.post('/projects', project);
    return data;
  },

  update: async (id: string, project: ProjectUpdate): Promise<Project> => {
    const { data } = await api.put(`/projects/${id}`, project);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};
