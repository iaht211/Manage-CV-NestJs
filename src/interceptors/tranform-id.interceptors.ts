import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class TransformIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        
        let transformedData;
        if (Array.isArray(data)) {
          transformedData = data.map(item => this.transformId(item.toJSON ? item.toJSON() : item));
        } else {
          transformedData = this.transformId(data?.toJSON ? data.toJSON() : data);
        }
        
        return transformedData;
      })
    );
  }

  private transformId(data: any): any {
    if (!data) return data;
    
    const transformed = { ...data };
    if (transformed._id) {
      transformed.id = transformed._id.toString();
      delete transformed._id;
    }
    return transformed;
  }
}