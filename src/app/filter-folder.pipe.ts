import { ArrayType } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFolder'
})
export class FilterFolderPipe implements PipeTransform {

  transform(data: any, search_name:string) {
    if (search_name === '') {
      return data;
    }
    let folderNames: any[] = [];
    for (const item of data) {
      const folderName = item.folder_name;
      if (folderName.startsWith(search_name)) {
        folderNames.push(item);
      }
    }
    return folderNames;
  }
}
