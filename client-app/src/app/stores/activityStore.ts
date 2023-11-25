import { makeAutoObservable, runInAction } from "mobx";
import { IActivity } from "../interfaces/IActivity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
  activityRegistry = new Map<string, IActivity>();
  selectedActivity: IActivity | null | undefined = null;
  isEditMode = false;
  isLoading = false;
  isInitialLoading = true;

  constructor() {
    makeAutoObservable(this)
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      activities.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
      });
      this.setIsInitialLoading(false);
    } catch (error) {
      console.log(error);
      this.setIsInitialLoading(false);
    }
  }

  setIsInitialLoading = (state: boolean) => {
    this.isInitialLoading = state;
  }

  selectActivity = (id: string) => {
    // this.selectedActivity = this.activities.find(activity => activity.id === id);
    this.selectedActivity = this.activityRegistry.get(id);
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.isEditMode = true;
  }

  closeForm = () => {
    this.isEditMode = false;
  }

  createActivity = async (activity: IActivity) => {
    this.isLoading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.isEditMode = false;
        this.isLoading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.isLoading = false;
      })
    }
  }

  updateActivity = async (activity: IActivity) => {
    this.isLoading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.isEditMode = false;
        this.isLoading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.isLoading = false;
      })
    }
  }

  deleteActivity = async (id: string) => {
    this.isLoading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        // this.activities = [...this.activities.filter(a => a.id !== id)];
        this.activityRegistry.delete(id); 
        if (this.selectedActivity?.id === id) {
          this.cancelSelectedActivity();
        }
        
        this.isLoading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.isLoading = false;
      })
    }
  }
}