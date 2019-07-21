import { TestBed } from '@angular/core/testing';
import { DogsService } from './dogs.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('DogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  providers: [DogsService],
  imports: [HttpClientTestingModule] 
  }));

  it('should be created', () => {
    const service: DogsService = TestBed.get(DogsService);
    expect(service).toBeTruthy();
  });
});
