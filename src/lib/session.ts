import { collection, doc, setDoc, updateDoc } from '@firebase/firestore';
import axios from 'axios';
import { db } from './firebase';
import { PropertyData, LeadData, WebhookData } from '../types';

const WEBHOOK_URL = 'https://workflowwebhook.prospectz.com.br/webhook/72522062-97a8-4ccc-bee0-bdb19425ef42';

export class SessionManager {
  private sessionId: string;
  private readonly sessionsCollection = 'sessions';
  private propertyData: PropertyData | null = null;

  constructor() {
    this.sessionId = crypto.randomUUID();
  }

  async initSession() {
    const sessionRef = doc(db, this.sessionsCollection, this.sessionId);
    await setDoc(sessionRef, {
      createdAt: new Date().toISOString(),
      status: 'started'
    });
    return this.sessionId;
  }

  async updatePropertyData(data: PropertyData) {
    this.propertyData = data;
    const sessionRef = doc(db, this.sessionsCollection, this.sessionId);
    await updateDoc(sessionRef, {
      propertyData: data,
      estimatedBasePrice: data.squareMeters * 10000,
      status: 'property_data_collected'
    });
  }

  async updateLeadData(data: LeadData) {
    if (!this.propertyData) {
      throw new Error('Property data must be collected before lead data');
    }

    const sessionRef = doc(db, this.sessionsCollection, this.sessionId);
    const estimatedBasePrice = this.propertyData.squareMeters * 10000;

    // Update Firestore
    await updateDoc(sessionRef, {
      leadData: data,
      status: 'completed'
    });

    // Send to webhook
    const webhookData: WebhookData = {
      sessionId: this.sessionId,
      propertyData: this.propertyData,
      leadData: data,
      estimatedBasePrice,
      timestamp: new Date().toISOString()
    };

    try {
      await axios.post(WEBHOOK_URL, webhookData);
    } catch (error) {
      console.error('Failed to send data to webhook:', error);
      // Continue execution even if webhook fails
    }
  }
}