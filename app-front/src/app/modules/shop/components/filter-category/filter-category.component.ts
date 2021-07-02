import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Category} from "../../interfaces/category";
import {RequestService} from "../../services/request.service";

@Component({
    selector: 'app-filter-category',
    templateUrl: './filter-category.component.html',
    styleUrls: ['./filter-category.component.sass']
})
export class FilterCategoryComponent implements OnInit {
    categories: Category[] = [];
    loading = true;
    selectedIndex: string = this.requestService.categoryId;

    @Output() renderProductsByCategory = new EventEmitter()

    constructor(private requestService: RequestService) {
    }

    ngOnInit(): void {
        this.requestService.loadCategories().subscribe((categories) => {
            this.categories = (categories as Category[])
            this.loading = false;
        })
    }

    renderProducts(i: number = null, id = null) {
        this.selectedIndex = id
        this.renderProductsByCategory.emit(id)
    }

}
