import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { TableColumn } from 'src/app/models/table/table-column.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columns: TableColumn[];
  @Input() set dataSource(data: unknown[]) {
    this.setDataSource(data);
  }

  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(
      (tableColumn: TableColumn) => tableColumn.caption
    );
  }

  setDataSource(data: unknown[]) {
    this.tableDataSource = new MatTableDataSource<unknown>(data);
  }
}
