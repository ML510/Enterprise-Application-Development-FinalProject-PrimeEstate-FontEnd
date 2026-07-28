import { Time } from "@angular/common";

export interface PropertyApiResponse{
    success: boolean;
    message: string;
    data: Property[];
    timestamp: Date;
}

export interface PropertyPageData {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: string;
    totalElements: number;
    totalPages: number;
    last: boolean;
    content: Property[];
}

export interface PaginatedPropertyApiResponse {
    success: boolean;
    message: string;
    data: PropertyPageData;
    timestamp: Date;
}

export interface ApiResponse{
    success: boolean;
    message: string;
    data: any;
    timestamp: Date;
}

export interface SinglePropertyApiResponse{
    success: boolean;
    message: string;
    data: Property;
    timestamp: Date;
} 

export interface Property {
    id:number;
    name: string;
    state: string;
    price: number;
    url: string;
    status: string;
    maxBedCount: number;
    minBedCount: number;
    sqft: number;
    dsc: string;
}

export interface Lead {
    id:number;
    name: string;
    email: string;
    phone: string;
    lastContact: Date;
    stage: string;
    profilePic: string;
}

export interface Viewing {
    name: string;
    email: string;
    phone: string;
    viewingDate: Date;
    time: Time;
    note: string;
}