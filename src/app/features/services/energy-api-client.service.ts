import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Device } from "src/app/core/models/device.model";
import { Energy } from "src/app/core/models/energy.model";
import { User } from "src/app/core/models/user.model";
import { environment } from "src/environments/environment";
import { ChatMessage } from "../chat/models/chat-message";
import { ChatMessageResponse, ChatMessageResponseList } from "../chat/models/chat-message-response";
import { GetChatMessageRequest } from "../chat/models/get-chat-message-request";


@Injectable({providedIn: 'root'})
export class EnergyApiClientService {
    constructor(private httpClient: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${environment.apiUrl}/user`);
    }

    createUser(user: User): Observable<User> {
        return this.httpClient.post<User>(`${environment.apiUrl}/user`, user);
    }

    deleteUser(userId: string): Observable<User> {
        return this.httpClient.delete<User>(`${environment.apiUrl}/user/${userId}`);
    }

    editUser(userId: string, user: User): Observable<User> {
        return this.httpClient.patch<User>(`${environment.apiUrl}/user/${userId}`, user);
    }

    getDevices(): Observable<Device[]> {
        return this.httpClient.get<Device[]>(`${environment.apiUrl}/device`);
    }

    getDevicesByUserId(userId: string): Observable<Device[]> {
        return this.httpClient.get<Device[]>(`${environment.apiUrl}/device/${userId}`);
    }

    associateDevice(deviceId: string, userId: string): Observable<Device> {
        return this.httpClient.patch<Device>(`${environment.apiUrl}/device/device/${deviceId}/user/${userId}`, '');
    }

    getEnergyByDevice(deviceId: string): Observable<Energy[]> {
        return this.httpClient.get<Energy[]>(`${environment.apiUrl}/energy/${deviceId}`);
    }

    startPolling(): Observable<any> {
        return this.httpClient.get<any>('http://localhost:8000');
    }

    sendMessage(message: ChatMessage): Observable<ChatMessageResponse> {
        return this.httpClient.post<ChatMessageResponse>(`${environment.apiUrl}/hero/test`, message);
    }

    getMessage(username: GetChatMessageRequest): Observable<ChatMessageResponseList> {
        return this.httpClient.get<ChatMessageResponseList>(`${environment.apiUrl}/hero/test`);
    }

    editMessage(message: string, seen: string, typing: string): Observable<ChatMessage> {
        return this.httpClient.patch<ChatMessage>(`${environment.apiUrl}/hero/test/${message}/${seen}/${typing}`, '');
    }
}