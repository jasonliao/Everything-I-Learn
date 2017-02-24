//
//  ListDetailTableViewController.swift
//  Checklists
//
//  Created by  jasonliao on 22/02/2017.
//  Copyright © 2017  jasonliao. All rights reserved.
//

import UIKit

protocol ListDetailTableViewControllerDelegate: class {
    func listDetailTableViewControllerDidCancel(_ controller: UITableViewController)
    func listDetailTableViewControllerDidFinishAdding(_ controller: UITableViewController, checklist: Checklist)
    func listDetailTableViewControllerDidFinishEditing(_ controller: UITableViewController, checklist: Checklist)
}

class ListDetailTableViewController: UITableViewController, UITextFieldDelegate {
    
    @IBOutlet weak var checklistTextField: UITextField!
    @IBOutlet weak var doneBarButton: UIBarButtonItem!
    
    var editChecklist: Checklist?
    
    weak var delegate: ListDetailTableViewControllerDelegate?

    override func viewDidLoad() {
        super.viewDidLoad()

        if let checklist = editChecklist {
            title = "Edit Checklist"
            checklistTextField.text = checklist.name
            doneBarButton.isEnabled = true
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        checklistTextField.becomeFirstResponder()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }
    
    // MARK: willl select
    
    override func tableView(_ tableView: UITableView, willSelectRowAt indexPath: IndexPath) -> IndexPath? {
        return nil
    }
    

    // MARK: UITextFieldDelegate
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        let oldText = textField.text! as NSString
        let newText = oldText.replacingCharacters(in: range, with: string) as NSString
        
        doneBarButton.isEnabled = newText.length > 0
        return true
    }
    
    /*
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: indexPath)

        // Configure the cell...

        return cell
    }
    */

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    
    // MARK: IB action
    @IBAction func cancel() {
        delegate?.listDetailTableViewControllerDidCancel(self)
    }
    
    @IBAction func done() {
        if let checklist = editChecklist {
            checklist.name = checklistTextField.text!
            delegate?.listDetailTableViewControllerDidFinishEditing(self, checklist: checklist)
        } else {
            let checklist = Checklist(name: checklistTextField.text!, items: [])
            delegate?.listDetailTableViewControllerDidFinishAdding(self, checklist: checklist)
        }
    }

}
