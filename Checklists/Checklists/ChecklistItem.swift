//
//  ChecklistItem.swift
//  Checklists
//
//  Created by  jasonliao on 11/02/2017.
//  Copyright © 2017  jasonliao. All rights reserved.
//

import Foundation

class ChecklistItem {
    var text = ""
    var checked = false
    
    init(text: String, checked: Bool) {
        self.text = text
        self.checked = checked
    }
    
    func toggleChecked() {
        checked = !checked
    }
}
