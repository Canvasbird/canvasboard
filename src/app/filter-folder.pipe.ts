import { ArrayType } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFolder'
})
export class FilterFolderPipe implements PipeTransform {

  transform(data: any, searchName: string) {
    if (searchName === '') {
      return data;
    }
    const folderNames: any[] = [];
    for (const item of data) {
      const folderName = item.folder_name;
      if (folderName.startsWith(searchName)) {
        folderNames.push(item);
      }
    }
    return folderNames;
  }
}
